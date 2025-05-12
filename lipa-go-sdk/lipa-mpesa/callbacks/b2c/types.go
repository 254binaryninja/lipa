package b2c

// This file contains the types used for the callbacks from the M-Pesa API.
// The types are used to unmarshal the JSON responses from the API.

type B2CRequest struct {
	OriginatorConversationID string `json:"OriginatorConversationID"`
	InitiatorName            string `json:"InitiatorName"`
	SecurityCredential       string `json:"SecurityCredential"`
	CommandID                string `json:"CommandID"`
	Amount                   string `json:"Amount"`
	PartyA                   string `json:"PartyA"`
	PartyB                   string `json:"PartyB"`
	Remarks                  string `json:"Remarks"`
	QueueTimeOutURL          string `json:"QueueTimeOutURL"`
	ResultURL                string `json:"ResultURL"`
	Occasion                 string `json:"Occasion"`
}

type B2CResponse struct {
	ConversationID           string `json:"ConversationID"`
	OriginatorConversationID string `json:"OriginatorConversationID"`
	ResponseCode             string `json:"ResponseCode"`
	ResponseDescription      string `json:"ResponseDescription"`
}

type B2CResult struct {
	Result Result `json:"Result"`
}
type Result struct {
	ResultType               int           `json:"ResultType"`
	ResultCode               int           `json:"ResultCode"`
	ResultDesc               string        `json:"ResultDesc"`
	OriginatorConversationID string        `json:"OriginatorConversationID"`
	ConversationID           string        `json:"ConversationID"`
	TransactionID            string        `json:"TransactionID"`
	ReferenceData            ReferenceData `json:"ReferenceData"`
}

type ReferenceData struct {
	ReferenceItem ReferenceItem `json:"ReferenceItem"`
}

type ReferenceItem struct {
	Key   string `json:"Key"`
	Value string `json:"Value"`
}
