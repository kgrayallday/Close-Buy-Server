const axios = require('axios');
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const { convert } = require('html-to-text');

// pass the credentials through the ext file.
// can't set the credential of object inside here. 'ebay-oauth-nodejs-client' provided by eBay has an error.
const ebayAuthToken = new EbayAuthToken({
    filePath: './helper/ebay-config.json'
});
const clientScope = 'https://api.ebay.com/oauth/api_scope';

const refreshToken = (token) => {
  // Client Crendential Auth Flow
  ebayAuthToken.getAccessToken('SANDBOX', token, clientScope).then((data) => {
    return data;
  }).catch((error) => {
      console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
  });
};

const makeEbayConfig = (token, term) => {
  return {
    // url: '/item_summary/search',
    method: 'get',
    baseURL: 'https://api.sandbox.ebay.com',  
    // headers for ebay
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'cache-control': 'no-cache',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
    },  
    params: {
      q: term,
      keywords: term,
      limit: 20,
      // fieldgroups : 'EXTENDED'
    } 
  };
 };

 const makeEbayDetailConfig = (token) => {
  return {
    // url: '/item_summary/search',
    method: 'get',
    baseURL: 'https://api.sandbox.ebay.com',  
    // headers for ebay
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'cache-control': 'no-cache',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
    },  
    params: {
      fieldgroups : 'PRODUCT'
    } 
  };
 };

// exports.getEbayListings = async (queryString, maxResult=20) => {
exports.getEbayListings = async (queryString, htmlToText=false) => {
  if (!queryString) {
    return [];
  }

  const accessToken = await ebayAuthToken.getApplicationToken('SANDBOX', clientScope);

  const config = await makeEbayConfig(accessToken, queryString);

  const axiosEbay = await axios.create(config);

  const listings = await axiosEbay.get('/buy/browse/v1/item_summary/search');
  // return listings.data.itemSummaries;

  // fieldgroups : PRODUCT
  const details = await Promise.all(listings.data.itemSummaries.map(async (listing) => {
    const config = await makeEbayDetailConfig(accessToken);
    let detail = await axios.get(`/buy/browse/v1/item/${listing.itemId}`, config);
    // console.log(detail);
    return detail;
  }));

  // const listingArray = details.map((detail) => {
  //   return detail.data;
  // })
  const listingArray = listings.data.itemSummaries.map((listing, index) => {
    return { ...listing, details: details[index].data }
  })

  return makeClosbuyObj(listingArray, htmlToText);
  // return makeClosbuyObj(listingArray);
};


const makeClosbuyObj = (cObj, converHtml=false) => {

  const newObj = cObj.map(obj => {   
    console.log(obj);
    let images = [];
    if (obj.details.image && obj.details.image.imageUrl) images.push(obj.details.image.imageUrl);
    if (obj.details.additionalImages) {
      obj.details.additionalImages.forEach(image => {
        if(image.imageUrl) images.push(image.imageUrl);    
      });
    }

    const flteredObj = {
      domain_id : obj.itemId,
      domain : 'ebay',
      category : 'blue',
      url : obj.itemWebUrl,
      location : `TBD----${obj.details.itemLocation.city} ${obj.details.itemLocation.stateOrProvince} ${obj.details.itemLocation.country}`,
      price : Number(obj.price.value) || 0,
      description : (converHtml)? convert(obj.details.description, {wordwrap: 130}) : obj.details.description,
      title : obj.title,
      post_date : 'TBD---', 
      images
    }
    return flteredObj;
  })

  return newObj;
};