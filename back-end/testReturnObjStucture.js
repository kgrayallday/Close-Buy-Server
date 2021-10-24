const axios = require('axios');

// This test data is not about Craigslist
// Listings of Craigslist don't have image url, its detail have imageUrls. 
// So, I am trying to copy deail to listing.
// This function is an example to make a merged object with two request.
async function asyncMain () {
    const response = await axios.get("https://reqres.in/api/users")
    const listings = response.data.data;

    const details = await Promise.all(listings.map(async (listing) => { 
      let detail = await axios.get("https://reqres.in/api/users/2")      
      return detail;
    }));

    let listingArray = listings.map((listing, index) => {
      return {...listing, details: details[index]}
    })

    console.log(listingArray);
}

asyncMain();