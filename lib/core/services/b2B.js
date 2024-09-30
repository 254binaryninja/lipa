import axios from "axios";

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
export async function b2B(mpesaURL,token,primaryShortCode,receiverShortCode,amount,callBackURL,paymentRef,patnerName) {
 
   const requestId = generateRandomString(12);
    try {
    const response = await axios.post(`${mpesaURL}/v1/ussdpush/get-msisdn`,{
        primaryShortCode: primaryShortCode,
        receiverShortCode: receiverShortCode,
        amount: amount,
        pallBackURL: callBackURL,
        paymentReference: paymentRef,
        partnerName: patnerName,
        RequestRefId: requestId
    },
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 } catch (error) {
    console.log("Error using the b2B",error);
    return error;
 }
}