const https = require('https');
const qryString = require('querystring');
const {convertNumber} = require("../helper/common");
const APIKEY = process.env.SERP_APIKEY;

// build url
function buildUrl(path, parameter, output) {
  // Set Parameters
  parameter["source"] = "nodejs"
  parameter["output"] = output ? output : 'json';
  parameter["api_key"] = APIKEY;
  if (parameter['engine'] == null) {
    parameter['engine'] = 'google'
  }

  return "https://serpapi.com" + path + "?" + qryString.stringify(parameter)
}

function execute(path, parameter, output) {
  const returnPromise = new Promise((res, rej) => {
    let url = buildUrl(path, parameter, output)
    https.timeout = 60000;
    https.get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received.
      resp.on('end', () => {
        try {
          if (resp.statusCode == 200) {
            res(JSON.parse(data)); 
          } else {
            throw data
          }
        } catch (e) {
          console.log('Error on end of https response: ', e);
          rej(e);
        }
      });

    }).on("error", (err) => {
      console.log('Error on error of https get: ', err);
      rej(err);
    });
  })

  return returnPromise;
}

exports.getGoogleShoppingListings = async (queryString, maxResult = 20) => {
  let params1 = {
    q: queryString,
    tbm: "shop",
    // location: "Dallas",
    hl: "en",
    gl: "ca",
    // async: true
    num: maxResult
  };

  try {
    const itemList = await execute('/search', params1, 'json');

    let shoppingList = [];
    if (itemList.shopping_results) shoppingList = itemList.shopping_results;

    const filterItems = await shoppingList.filter(item => (item.product_id));

    const details = await Promise.all(filterItems.map(async (listing) => {
      const detailParams = {
        product_id: listing.product_id,
        engine: "google_product",
        hl: "en"
      };

      const detail = await execute('/search', detailParams, 'json');

      return (detail.product_results) ? detail.product_results : {};
    }))

    let listingArray = filterItems.map((listing, index) => {
      return { ...listing, details: details[index] }
    })

    return makeClosbuyObj(listingArray);

  } catch (err) {
    console.log('Error on getGoogleShoppingListings route: ', err);
  }
  return [];
};

const makeClosbuyObj = (cObj) => {
  const newObj = cObj.map(obj => {
    let images = [];
    if (obj.thumbnail) images.push(obj.thumbnail);
    if (obj.details && obj.details.media) {
      obj.details.media.forEach(media => {
        if (media.type === 'image') images.push(media.link);
      });
    }

    const filteredObj = {
      title: obj.title,
      domain: 'google',
      category: 'yellow',
      domain_id: obj.product_id,
      location: 'TBD----Canada',
      url: obj.product_link || obj.link || '',
      price : (obj.price[0] || obj.price[0] == 0) ? convertNumber(obj.price) : 'N/A',
      // price: Number(obj.price.replace(/[^\d.-]/g, '')) || 0,
      description: (obj.details) ? ((obj.details.description) ? obj.details.description : '') : '',
      post_date: 'TBD----no data',
      images
    };

    return filteredObj;
  })

  return newObj;
};
