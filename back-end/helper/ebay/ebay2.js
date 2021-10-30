const EbayAuthToken = require('ebay-oauth-nodejs-client');

const scopes = ['https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.marketing',
    'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
];


const body = {
  grant_type: 'client_credentials',
  scope: 'https://api.ebay.com/oauth/api_scope'
};

const  PROD_OAUTHENVIRONMENT_WEBENDPOINT= 'https=//auth.ebay.com/oauth2/authorize';
const  SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT= 'https=//auth.sandbox.ebay.com/oauth2/authorize';
const  DEALS_BASE_URL= 'http=//www.ebay.com/rps/feed/v1.1/';
const  PROD_BASE_URL= 'api.ebay.com';
const  SANDBOX_BASE_URL= 'api.sandbox.ebay.com';
const  BASE_SVC_URL= 'svcs.ebay.com';
const  BASE_SANDBX_SVC_URL= 'svcs.sandbox.ebay.com';
const  MERCH_SRVC_NAME= 'MerchandisingService';
const  DEFAULT_BODY= body;



// pass the credentials through the ext file.
let ebayAuthToken = new EbayAuthToken({
    filePath: './ebay-config-sample.json'
});

// // pass the credentials through constructor
// ebayAuthToken = new EbayAuthToken({
//     clientId: '---Client id ----',
//     clientSecret: '-- client secret---',
//     redirectUri: '-- redirect uri name --'
// });

const clientScope = 'https://api.ebay.com/oauth/api_scope';
// // Client Crendential Auth Flow
ebayAuthToken.getApplicationToken('SANDBOX', clientScope).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});




/*
// // Authorization Code Auth Flow
ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes); // get user consent url.
// Using user consent url, you will be able to generate the code which you can use it for exchangeCodeForAccessToken.
// Also accepts optional values: prompt, state
ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes, { prompt: 'login', state: 'custom-state-value' });

// // Exchange Code for Authorization token
ebayAuthToken.exchangeCodeForAccessToken('PRODUCTION', code).then((data) => { // eslint-disable-line no-undef
    console.log(data);
}).catch((error) => {
    console.log(error);
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// // Getting access token from refresh token obtained from Authorization Code flow
const refreshToken = 'v^1.1#i^1#r^1#f^0#I^3#p^3#t^Ul4xMF8yOjNDMjU1MUI0OTJBMDg5NUZGMUY4RkEwNjk1MDRBQjQ2XzNfMSNFXjI2MA==';
ebayAuthToken.getAccessToken('PRODUCTION', refreshToken, scopes).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
});
*/
