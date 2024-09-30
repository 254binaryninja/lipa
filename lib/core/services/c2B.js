import axios from "axios";


export async function c2B(mpesaURL,shortCode,confirmationURL,baseURL,token,validate) {
 try {
     const response = await axios.post(`${mpesaURL}/mpesa/c2b/v1/registerurl`,
        {
            ShortCode: shortCode,
            ResponseType: "Completed",
            ConfirmationURL: confirmationURL,
            ValidationURL: validate?`${baseURL}/api/v1/c2b-callback`:"",
         },
         {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
     )

     return response.ResponseDescription;
 } catch (error) {
    console.log("Error using the c2B",error);
    return error;
 }
}