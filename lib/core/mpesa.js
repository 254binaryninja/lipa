import {authMpesa} from '../../utils.js';
import { lipaNaMpesa } from './services/lipaNaMpesa.js';
import { c2B } from './services/c2B.js';
import { b2B } from './services/b2B.js';
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

    async initiateC2B(shortCode,confirmationURL,baseURL,validate) {
        const token = await this.generateAccessToken();
        const response = await c2B(
          this.apiUrl,
          shortCode,
          confirmationURL,
          baseURL
          ,token,
          validate);
        return response;
    }

    async initiateB2B(primaryShortCode,receiverShortCode,amount,paymentRef,patnerName) {
        const token = await this.generateAccessToken();
        const response = await b2B(
          this.apiUrl,
          token,
          primaryShortCode,
          receiverShortCode,
          amount,
          this.baseUrl,
          paymentRef,
          patnerName
        );
        return response;
    }
}