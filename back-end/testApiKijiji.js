const kijiji = require("kijiji-scraper");

const options = {
    maxResults: 20,
    // scraperType: "html",
    // scrapeResultDetails: true,
};

const params = {
    locationId: 1700287,  // vancouver // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/locations.ts
    categoryId: 0,  // https://github.com/mwpenny/kijiji-scraper/blob/HEAD/lib/categories.ts
    // sortByName: priceAsc, //"dateDesc", "dateAsc", "priceDesc", "priceAsc"
    sortType: 'DISTANCE_ASCENDING', //"DATE_DESCENDING", "DISTANCE_ASCENDING", "PRICE_ASCENDING", "PRICE_DESCENDING

    q : 'couch'
};

// Scrape using returned promise
kijiji.search(params, options).then(ads => {
    // Use the ads array
    // for (let i = 0; i < ads.length; ++i) {
    //     console.log(ads[i].title);
    // }
    console.log(ads);
}).catch(console.error);

// Scrape using optional callback parameter
// function callback(err, ads) {
//     if (!err) {
//         // Use the ads array
//         // for (let i = 0; i < ads.length; ++i) {
//         //     console.log(ads[i].title);
//         // }
//         console.log(ads);
//     }
// }
// kijiji.search(params, options, callback);