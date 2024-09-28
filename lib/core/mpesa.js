import {authMpesa} from '../../utils.js';

class Mpesa {
    constructor(consumerKey,consumerSecret,environment,callbackUrl) {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.environment = environment;
        this.callbackUrl = callbackUrl;


        /// Set up the base URL based on the environment
        // Set API URLs based on the environment
    if (environment === 'sandbox') {
        this.apiUrl = 'https://sandbox.safaricom.co.ke/mpesa';
      } else if (environment === 'live') {
        this.apiUrl = 'https://api.safaricom.co.ke/mpesa';
      } else {
        throw new Error('Invalid environment. Choose "sandbox" or "live".');
      }
    }

    // Generate the access token
    async generateAccessToken() {
       const token = await authMpesa(this.consumerKey,this.consumerSecret,this.apiUrl);
         return token;
    }
}