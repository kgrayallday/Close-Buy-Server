const SerpApi = require('google-search-results-nodejs');
const APIKEY = process.env.SERP_APIKEY;
const search = new SerpApi.GoogleSearch(APIKEY);

exports.getGoogleShoppingListings = async (queryString, maxResult=20) => {

  try {
    if (!queryString) {
      return [];
    }
  
    let params = {
      q: queryString,
      tbm: "shop",
      // location: "Dallas",
      hl: "en",
      // gl: "us"
      // async: true
      num: maxResult * 2
    };
  
    const listingArray = await new Promise((resolve, reject)=>{
        search.json(params, (data) => {
          let shopping_results = [];
  
          // Check result of searching 
          if (data.shopping_results) shopping_results = data.shopping_results;
  
          // Some Googole items don't have product_id. they aren't able to find detail information without product_id
          const filtered_itmes = shopping_results.filter(item => (item.product_id));
  
          resolve(filtered_itmes);
        })
  
      })
      .then(async (filtered_itmes) => {
  
        const details = await Promise.all(filtered_itmes.map(async (listing) => {
          const detailParams = {
            product_id: listing.product_id,
            engine: "google_product",
            hl: "en"
          };    
  
          let detail = await new Promise((resolve, reject)=>{
            search.json(detailParams, (data) => {
              let detail = {};
              if (data.product_results) detail = data.product_results;
              resolve(detail);
            })
          });
  
          return detail;
        }));     
        
        let listings = filtered_itmes.map((listing, index) => {
          return { ...listing, details: details[index]}
        })
  
        return listings;
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
  
    return makeClosbuyObj(listingArray);

  } catch(e) {
    console.log(e);    
  } finally {
    return [];  
  }
};

const makeClosbuyObj = (cObj) => {
  const newObj = cObj.map(obj => {    
    let images = [];
    if (obj.thumbnail) images.push(obj.thumbnail);
    if (obj.details && obj.details.media){
      obj.details.media.forEach(media => {
        if (media.type === 'image') images.push(media.link);      
      });
    }

    const filteredObj = {
      title: obj.title,
      domain: 'google',
      category: 'yellow',
      domain_id: obj.product_id,
      location: 'TBD----',
      url: obj.product_link || obj.link || '',
      price: Number(obj.price.replace(/[^\d.-]/g, '')) || 0,
      description: (obj.details) ? ((obj.details.description) ? obj.details.description : '') : '',
      post_date: 'TBD----no data',
      images
    };

    return filteredObj;
  })

  return newObj;
};
