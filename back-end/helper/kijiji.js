const kijiji = require("kijiji-scraper");

const options = {
    minResults: 20
};

let params = {
    locationId: 1700287,  // vancouver // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/locations.ts
    categoryId: 0,  // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/categories.ts
    // sortByName: priceAsc, //"dateDesc", "dateAsc", "priceDesc", "priceAsc"
    sortType: 'DISTANCE_ASCENDING', //"DATE_DESCENDING", "DISTANCE_ASCENDING", "PRICE_ASCENDING", "PRICE_DESCENDING
    // q : 'couch'
};

exports.getKijijiFullListings = async (queryString) => {

  if (!queryString) {
    return [];
  }

  params = {...params, q: queryString}

  return kijiji.search(params, options);
};
