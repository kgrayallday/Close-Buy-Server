const craigslist = require('node-craigslist')

const _PROTOCOL = 'https:';
const _BASEHOST = 'craigslist.org';
const maxRedirectCount = 5;
const city = 'vancouver';

const query = 'couch';
const category = 'fua'; // defaults to sss (all)
const minPrice = '50';
const maxPrice = '200';

const myIp = ''; //TODO : test - get geocode and pass to this api

const client = new craigslist.Client({
  city: 'abbotsford',
  maxRedirectCount: maxRedirectCount,
  protocol: _PROTOCOL,
  postal: 'V2X9G*',
  searchDistance: 30
});

const options = {
  baseHost: _BASEHOST, // defaults to craigslist.org
  category: category, 
  maxPrice: maxPrice,
  minPrice: minPrice

};

/**************************/
/****** For Listing *******/
/**************************/
client
  .search(options, query)
  .then((listings) => {
    listings.forEach((listing) => console.log(listing));
  })
  .catch((err) => {
    console.error(err);
  });

/**************************/
/****** For Detail *******/
/**************************/
// client
//   .search(options, query)
// //   // .then((listings) => client.details(listings[1]))
//   .then((listings) => client.details({url:listings[1].url, pid:listings[1].pid }))  
//   .then((details) => {
//     console.log(details);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/**************************************************/
/****** For mergin detail to listing **************/
/**************************************************/
// async function asyncMain () {
//   const listings = await client.search(options, query);

//   const details = await Promise.all(listings.map(async (listing) => { 
//     let detail = await client.details({url: listing.url, pid: listing.pid})
//     return detail;
//   }));

//   let listingArray = listings.map((listing, index) => {
//     return {...listing, details: details[index]}
//   })

//   console.log(listingArray);   
// }
// asyncMain();



/*
********************
*****Categories*****
********************
sss = all
ata = antiques
ppa = appliances
ara = arts+crafts
sna = atvs/utvs/snow
pta = auto parts
baa = baby+kids
bar = barter
haa = beauty+hlth
bip = bike parts
bia = bikes
bpa = boat parts
boo = boats
bka = books
bfa = business
cta = cars+trucks
ema = cds/dvd/vhs
moa = cell phones
cla = clothes+acc
cba = collectibles
syp = computer parts
sya = computers
ela = electronics
gra = farm+garden
zip = free stuff
fua = furniture
gms = garage sales
foa = general
hva = heavy equipment
hsa = household
jwa = jewelry
maa = materials
mpa = motorcycle parts
mca = motorcycles
msa = music instr
pha = photo+video
rva = RVs
sga = sporting
tia = tickets
tla = tools
taa = toys+games
vga = video gaming
waa = wanted
*/