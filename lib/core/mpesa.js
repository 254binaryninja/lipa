import {authMpesa} from '../../utils.js';
import { lipaNaMpesa } from './services/lipaNaMpesa.js';
class Mpesa {
    constructor(consumerKey,consumerSecret,environment,baseUrl) {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.environment = environment;
        this.callbackUrl = `${baseUrl}/api/v1/lipa-callback`;


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

    // Lipa Na Mpesa
    async initiateLipaNaMpesa(phoneNumber,amount,shortCode,passKey) {
        const token = await this.generateAccessToken();
        const response =  await lipaNaMpesa(phoneNumber,amount,shortCode,passKey,this.apiUrl,this.callbackUrl,token);
        return response;
    }
}