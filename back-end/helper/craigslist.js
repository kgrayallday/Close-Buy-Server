//Should be a class
const craigslist = require('node-craigslist');

const _PROTOCOL = 'https:';
const _BASEHOST = 'craigslist.org';
const maxRedirectCount = 5;
const city = 'vancouver';

const query = 'lights';
const category = 'fua'; // defaults to sss (all)
const maxPrice = '70';
const minPrice = '50';

const myIp = ''; //TODO : test - get geocode and pass to craigslist api

const client = new craigslist.Client({
  city: city,
  maxRedirectCount: maxRedirectCount,
  protocol: _PROTOCOL
});

const options = {
  baseHost: _BASEHOST, // defaults to craigslist.org
  // category: category,
  // maxPrice: maxPrice,
  // minPrice: minPrice
};


exports.getFullListings = async (queryString) => {

  if (!queryString) {
    return [];
  }

  const listings = await client.search(options, queryString);

  const details = await Promise.all(listings.map(async (listing) => {
    let detail = await client.details({ url: listing.url, pid: listing.pid })
    return detail;
  }));

  let listingArray = listings.map((listing, index) => {
    return { ...listing, details: details[index] }
  })

  return listingArray;
};

exports.getListings = async (queryString) => {
  if (!queryString) {
    return [];
  }
  return client.search(options, queryString);
};

exports.getDeatil = async (url, pid) => {
  if (!(url && pid)) return {};
  return client.details({url, pid});
};
