const kijiji = require("kijiji-scraper");
const {convertNumber} = require("../helper/common");

const options = {
    maxResults: 20,
    scrapeResultDetails: true
};

let params = {
    locationId: 1700287,  // vancouver // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/locations.ts
    categoryId: 0,  // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/categories.ts
    // sortByName: priceAsc, //"dateDesc", "dateAsc", "priceDesc", "priceAsc"
    sortType: 'DISTANCE_ASCENDING', //"DATE_DESCENDING", "DISTANCE_ASCENDING", "PRICE_ASCENDING", "PRICE_DESCENDING
    // q : 'couch'
};

exports.getKijijiFullListings = async (queryString, maxResult) => {

  if (!queryString) {
    return [];
  }
  params.q = queryString;
  if (maxResult) options.q = maxResult;


  const listings = await kijiji.search(params, options);

  const details = await Promise.all(listings.map(async (listing) => {
    //Kijiji library cant' search detail with 'cas_id' ex) "https://www.kijiji.ca/v-tool-other/canada/finance-available-:13ft-mobile-home-mobile-container-trailer-home-office/cas_15504822"
    let detail = {};
    try{
      detail = await kijiji.Ad.Get(listing.url);    
    } catch (err) {
      // console.log(err);
    }
    return detail;
  }));

  let listingArray = listings.map((listing, index) => {
    return { ...listing, details: details[index] }
  })

  return makeClosbuyObj(listingArray);
};

exports.insertKijijiFullListings = async (queryString) => {

  if (!queryString) {
    return [];
  }
  params = {...params, q: queryString}

  const listings = await kijiji.search(params, options);

  const details = await Promise.all(listings.map(async (listing) => {
    //Kijiji library cant' search detail with 'cas_id' ex) "https://www.kijiji.ca/v-tool-other/canada/finance-available-:13ft-mobile-home-mobile-container-trailer-home-office/cas_15504822"
    let detail = {};
    try{
      detail = await kijiji.Ad.Get(listing.url);    
    } catch (err) {
      // console.log(err);
    }
    return detail;
  }));

  let listingArray = listings.map((listing, index) => {
    return { ...listing, details: details[index] }
  })

  db.insert (makeClosbuyObj(listingArray, false))

  return makeClosbuyObj(listingArray);
};

const makeClosbuyObj = (cObj, hasImage=true) => {
  const newObj = cObj.map(obj => {    
    obj.domain = 'kijiji'
    obj.category = 'green'
    obj.domain_id = obj.id;
    obj.location = 'TBD----' + ((obj.attributes.location) ? obj.attributes.location : '');
    // obj.price = obj.attributes.price;
    // When item of kijiji is free, doesn't respose price field. those are all free.
    obj.price = (obj.attributes && obj.attributes.price ) ? convertNumber(obj.attributes.price) : 0 ;
    obj.description = obj.details.description;
    obj.post_date = obj.date;

    if (!hasImage) delete obj.images;
    delete obj.date;
    delete obj.image;
    delete obj.attributes;
    delete obj.id;
    delete obj.details;

    return obj;
  })

  return newObj;
};
