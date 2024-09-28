// Handle authentication for the consumer key and secret of the Mpesa app
import axios from "axios";

export async function authMpesa(consumerKey,consumerSecret,mpesaURL) {
    try {
     const auth = Buffer.from(
       `${consumerKey}:${consumerSecret}`
     ).toString("base64")
     
     const response = await axios.get(
      `${mpesaURL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
     )

     return response.data.auth_token

    } catch (error) {
       console.log("Error from authenticating api",error) 
      return error  
    }
}