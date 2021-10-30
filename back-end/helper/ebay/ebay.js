const Ebay = require('ebay-node-api');

let ebay = new Ebay({
    clientID: 'RickDark-CloseBuy-SBX-aabbb16c7-41d53e19',
    clientSecret: 'SBX-abbb16c7ad35-ba61-45f8-9880-bda5',
    env: "SANDBOX",
    // headers: {
    //   // optional, There is not much items in CA, SANDBOX
    //   "X-EBAY-C-MARKETPLACE-ID": "EBAY_CA" 
    // },    
    body: {
        grant_type: 'client_credentials',
    //you may need to define the oauth scope
    scope: 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.marketing'
    }
});






exports.getEbayListings = async (queryString, maxResult=20) => {

  if (!queryString) {
    return [];
  }

  const params = {
    // offset: 20,
    keywords: queryString,
    limit: maxResult,
    fieldgroups : 'EXTENDED,MATCHING_ITEMS'
  }

  const con = await ebay.getAccessToken();

  console.log(con);

  // const listings = await ebay.searchItems(params);  //param keyword
  // const listings = ebay.findItemsAdvanced(params); //param keywords
  // const listings = ebay.searchItems(params); //param keywords
  // const listings = ebay.getItemsByItemGroup(params); //param keywords

  // await ebay.getAccessToken();
  const detail = await ebay.getItem('v1|110539236347|0');
  // const detail = await ebay.getItem({item_id:});getSingleItem
    // const detail = await ebay.getSingleItem('v1|110539236347|0');

  // console.log('detail ---> ', detail);

  // ebay.getAccessToken().then(data => {
  //   ebay
  //     .searchItems({
  //       keyword: "couch",
  //       limit: "1"
  //     })
  //     .then(data => {
  //       console.log(data);
  //       // Data is in format of JSON
  //       // To check the format of Data, Go to this url (https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-SearchforItemsbyKeyword-0)
  //     });
  // });

  // return listings;
  // return JSON.parse(listings);
  return detail;

};











// //This call searches for items on eBay using specific eBay category ID numbers
// ebay.findItemsByCategory(10181).then((data) => {
//   console.log(data);
// }, (error) => {
//   console.log(error);
// });

/*
https://api.ebay.com/oauth/api_scope	View public data from eBay
https://api.ebay.com/oauth/api_scope/buy.order.readonly	View your order details
https://api.ebay.com/oauth/api_scope/buy.guest.order	Purchase eBay items anywhere without signing in to eBay
https://api.ebay.com/oauth/api_scope/sell.marketing.readonly	View your eBay marketing activities, such as ad campaigns and listing promotions
https://api.ebay.com/oauth/api_scope/sell.marketing	View and manage your eBay marketing activities, such as ad campaigns and listing promotions
https://api.ebay.com/oauth/api_scope/sell.inventory.readonly	View your inventory and offers
https://api.ebay.com/oauth/api_scope/sell.inventory	View and manage your inventory and offers
https://api.ebay.com/oauth/api_scope/sell.account.readonly	View your account settings
https://api.ebay.com/oauth/api_scope/sell.account	View and manage your account settings
https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly	View your order fulfillments
https://api.ebay.com/oauth/api_scope/sell.fulfillment	View and manage your order fulfillments
https://api.ebay.com/oauth/api_scope/sell.analytics.readonly	View your selling analytics data, such as performance reports
https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly	View product selling data to help you make pricing and stocking decisions
https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly	Search and view eBay product catalog information
https://api.ebay.com/oauth/api_scope/buy.shopping.cart	View and manage your shopping cart for eBay items
https://api.ebay.com/oauth/api_scope/buy.offer.auction	View and manage bidding activities for auctions
https://api.ebay.com/oauth/api_scope/commerce.identity.readonly	View a user's basic information, such as username or business account details, from their eBay member account
https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly	View a user's personal email information from their eBay member account.
https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly	View a user's personal telephone information from their eBay member account
https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly	View a user's address information from their eBay member account
https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly	View a user's first and last name from their eBay member account
https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly	View a user's eBay member account status
https://api.ebay.com/oauth/api_scope/sell.finances	View and manage your payment and order information to display this information to you and allow you to initiate refunds using the third party application
https://api.ebay.com/oauth/api_scope/sell.item.draft	View and manage your item drafts
https://api.ebay.com/oauth/api_scope/sell.payment.dispute	View and manage disputes and related details (including payment and order information)
https://api.ebay.com/oauth/api_scope/sell.item	View and manage your item information
https://api.ebay.com/oauth/api_scope/sell.reputation	View and manage your reputation data, such as feedback
https://api.ebay.com/oauth/api_scope/sell.reputation.readonly	View your reputation data, such as feedback
https://api.ebay.com/oauth/api_scope/commerce.notification.subscription	View and manage your event notification subscriptions
https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly	View your event notification subscriptions


https://api.ebay.com/oauth/api_scope	View public data from eBay
https://api.ebay.com/oauth/api_scope/buy.guest.order	Purchase eBay items anywhere without signing in to eBay
https://api.ebay.com/oauth/api_scope/buy.item.feed	View curated feeds of eBay items
https://api.ebay.com/oauth/api_scope/buy.marketing	Retrieve eBay product and listing data for use in marketing merchandise to buyers
https://api.ebay.com/oauth/api_scope/buy.product.feed	View curated feeds of products from the eBay catalog
https://api.ebay.com/oauth/api_scope/buy.marketplace.insights	View historical sales data to help buyers make informed purchasing decisions
https://api.ebay.com/oauth/api_scope/buy.proxy.guest.order	Purchase eBay items anywhere, using an external vault for PCI compliance
https://api.ebay.com/oauth/api_scope/buy.item.bulk	Retrieve eBay items in bulk

*/