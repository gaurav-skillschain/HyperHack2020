
const tabStorage = {};
const sessionStorage = {};

const networkFilters = {
    urls: [
        "<all_urls>"
    ]
};

var opt_extraInfoSpec = ["blocking", "requestBody"];

var _redirectURL = "";

chrome.runtime.onInstalled.addListener(function() {

    var account = localStorage.getItem('account');

    if (!account) {

        // Generate a public-private keypair for user
        let userKey = keyPair();

        // Generate a strong password for the user
        let secretKey = generateId(12);

        // Encrypt and store the cryptographyic keys
        let account = {
            publicKey: userKey.publicKey,
            privateKeyEncrypted: CryptoJS.AES.encrypt(userKey.secretKey, secretKey).toString()
        }

        localStorage.setItem('account', JSON.stringify(account));

        alert("Please store the following key: " + secretKey);
    }
})

chrome.webRequest.onBeforeRequest.addListener((details) => {
    
    let account = JSON.parse(localStorage.getItem('account'));
    var url = 'http://localhost:8000/session/';


    return {
        redirectUrl: url + account.publicKey + "?redirectURL=" + details.url /*Redirection URL*/
    };
    

}, networkFilters, opt_extraInfoSpec);

// chrome.webRequest.onAuthRequired.addListener((details) => {

//     console.log("Authentication Needed");

// }, networkFilters);

// chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    
//     console.log(details);
//     return {requestHeaders: details.requestHeaders};

// }, networkFilters, ["blocking", "requestHeaders"]);
