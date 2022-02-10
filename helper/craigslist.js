//Should be a class
const craigslist = require('node-craigslist');
const {convertNumber} = require("../helper/common");

const _PROTOCOL = 'https:';
const _BASEHOST = 'craigslist.org';
const _maxRedirectCount = 5;
const _maxResult = 20;
const city = 'vancouver';


const query = 'lights';
const category = 'sss'; // defaults to sss (all)
const maxPrice = '70';
const minPrice = '50';

const myIp = ''; //TODO : test - get geocode and pass to craigslist api

const client = new craigslist.Client({
  city: city,
  maxRedirectCount: _maxRedirectCount,
  protocol: _PROTOCOL
});

const options = {
  baseHost: _BASEHOST, // defaults to craigslist.org
  category: category,
  // maxPrice: maxPrice,
  // minPrice: minPrice
};


exports.getCraigslistsFullListings = async (queryString, maxResult=_maxResult) => {

  if (!queryString) {
    return [];
  }

  let listings = await client.search(options, queryString);
  listings = listings.slice(0, maxResult);

  const details = await Promise.all(listings.map(async (listing) => {
    let detail = await client.details({ url: listing.url, pid: listing.pid })
    return detail;
  }));

  let listingArray = listings.map((listing, index) => {
    return { ...listing, details: details[index] }
  })

  return makeClosbuyObj(listingArray);
};

exports.getCraigslistsListings = async (queryString) => {
  if (!queryString) {
    return [];
  }
  return client.search(options, queryString);
};

exports.getCraigslistsDeatil = async (url, pid) => {
  if (!(url && pid)) return {};
  return client.details({url, pid});
};

const makeClosbuyObj = (cObj) => {
  const newObj = cObj.map(obj => {    
    obj.domain = 'craigslist'
    obj.category = 'green'
    obj.domain_id = Number(obj.pid);
    obj.images = (obj.details.images) ? obj.details.images : [];
    obj.location = 'TBD----' + obj.location;
    // obj.price = (obj.price.trim().isEmpty) ? 0 : Number(obj.price.replace('$',''));
    obj.price = (obj.price || obj.price == 0) ? convertNumber(obj.price) : 'N/A';
    obj.description = obj.details.description;
    obj.post_date = obj.date;

    delete obj.date;
    delete obj.hasPic;
    delete obj.pid;
    delete obj.details;

    return obj;
  })

  return newObj;
};