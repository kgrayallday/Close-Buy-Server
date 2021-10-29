const APIKEY = process.env.ETSY_APIKEY;
const limit = 20;
const region = 'CA';
const location = 'vancouver';
const baseUrl = 'https://openapi.etsy.com/v2/listings/active?';

exports.getEtsyListings = async (queryTerm) => {
  const axios = require('axios');

  if (!queryTerm) {
    return [];
  }

  const url = baseUrl+`keywords=${queryTerm}&query=${queryTerm}&tags=${queryTerm}&limit=${limit}&region=${region}&location=${location}&includes=Images:5&api_key=${APIKEY}`;

  const listingArray = await axios.get(url);

  return makeClosbuyObj(listingArray.data.results);
};

const makeClosbuyObj = (cObj) => {

  const newObj = cObj.map(obj => {   
    let images = [];
    obj.Images.forEach(image => {
      if(image.url_570xN) images.push(image.url_570xN);      
    });

    const flteredObj = {
        domain_id : obj.listing_id,
        domain : 'etsy',
        category : 'blue',
        url : obj.url,
        location : 'TBD----'+location,
        price : Number(obj.price) || 0,
        description : obj.description,
        title : obj.title,
        post_date : 'TBD---' + (new Date(obj.creation_tsz).toString() || ''),
        images
    }
    return flteredObj;
  })

  return newObj;
};
