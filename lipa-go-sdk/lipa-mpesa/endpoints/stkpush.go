package endpoints

import (
	"encoding/json"
	"fmt"

	"github.com/254binaryninja/lipa-mpesa-go/client"
)

// STKPushRequest represents the payload required to initiate an M-Pesa STK Push request.
type STKPushRequest struct {
	BusinessShortCode string `json:"BusinessShortCode"` // The organization shortcode used to initiate the transaction.
	Password          string `json:"Password"`          // The password for authentication, usually a base64-encoded string.
	Timestamp         string `json:"Timestamp"`         // The timestamp of the transaction in the format YYYYMMDDHHMMSS.
	TransactionType   string `json:"TransactionType"`   // The type of transaction to be performed.
	Amount            string `json:"Amount"`            // The amount to be transacted.
	PartyA            string `json:"PartyA"`            // The phone number sending the funds.
	PartyB            string `json:"PartyB"`            // The organization shortcode receiving the funds.
	PhoneNumber       string `json:"PhoneNumber"`       // The phone number to receive the STK push prompt.
	CallBackURL       string `json:"CallBackURL"`       // The URL to receive payment notifications.
	AccountReference  string `json:"AccountReference"`  // Reference for the transaction.
	TransactionDesc   string `json:"TransactionDesc"`   // Description of the transaction.
}

// STKPushResponse represents the response returned after initiating an M-Pesa STK Push request.
type STKPushResponse struct {
	MerchantRequestID   string `json:"MerchantRequestID"`   // Unique request ID for tracking the transaction.
	CheckoutRequestID   string `json:"CheckoutRequestID"`   // Unique checkout request ID.
	ResponseCode        string `json:"ResponseCode"`        // Response code from the API.
	ResponseDescription string `json:"ResponseDescription"` // Description of the response.
	CustomerMessage     string `json:"CustomerMessage"`     // Message intended for the customer.
}

// SendSTKPush sends an STK Push request to the M-Pesa API using the provided client and request payload.
//
// Parameters:
//   - c: pointer to an MpesaClient used to make the API call.
//   - req: STKPushRequest struct containing the transaction details.
//
// Returns:
//   - *STKPushResponse: pointer to the response struct with API response data.
//   - error: any error encountered during the request or response decoding.
func SendSTKPush(c *client.MpesaClient, req STKPushRequest) (*STKPushResponse, error) {
	endpoint := "/mpesa/stkpush/v1/processrequest"

	resp, err := c.Post(endpoint, req)
	if err != nil {
		return nil, fmt.Errorf("failed to send STK push request: %w", err)
	}

	defer resp.Body.Close()

	var stkResp STKPushResponse
	if err := json.NewDecoder(resp.Body).Decode(&stkResp); err != nil {
		return nil, fmt.Errorf("failed to decode STK push response: %w", err)
	}

	return &stkResp, nil
}
