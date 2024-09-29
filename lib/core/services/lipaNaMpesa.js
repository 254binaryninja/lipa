import axios from 'axios';

export async function lipaNaMpesa(phoneNumber,amount,shortCode,passKey,mpesaURL,callBackURL,token) {
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
 
      const cleanedNumber = phoneNumber.replace(/\D/g, "");
 
      const formattedPhone = `254${cleanedNumber.slice(-9)}`;
 
      const password = Buffer.from(
      shortCode + passKey + timestamp
      ).toString("base64");

    try {
        const response = await axios.post(
         `${mpesaURL}/mpesa/stkpush/v1/processrequest`,
         {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: callBackURL,
            AccountReference: phoneNumber,
            TransactionDesc: "Lipa na Mpesa"
         },
         {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      return response.ResponseDescription
    } catch (error) {
      console.error("Error using the stk push",error);
      return error  
    }
}