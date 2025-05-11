package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/254binaryninja/lipa-mpesa-go/auth"
	"github.com/254binaryninja/lipa-mpesa-go/config"
)

// Client is a struct that holds the HTTP client and the configuration for the M-Pesa API.
type MpesaClient struct {
	Config *config.Config // Config holds the API configuration (credentials, environment, etc.)
	HTTP   *http.Client   // HTTP is the HTTP client used to make requests.
}

// NewClient creates and returns a new Client instance with the provided configuration.
//
// Parameters:
//   - cfg: pointer to a Config struct containing API credentials and environment.
//
// Returns:
//   - *Client: a pointer to the initialized Client struct.
func NewClient(cfg *config.Config) *MpesaClient {
	return &MpesaClient{
		Config: cfg,
		HTTP:   &http.Client{},
	}
}

// Post sends an authenticated POST request to the specified M-Pesa API endpoint.
//
// It retrieves an access token, constructs the full API URL based on the environment,
// marshals the payload to JSON, sets the required headers, and sends the request.
//
// Parameters:
//   - endpoint: the API endpoint path (e.g., "/mpesa/stkpush/v1/processrequest").
//   - payload: the request body to be sent as JSON.
//
// Returns:
//   - *http.Response: the HTTP response from the API.
//   - error: any error encountered during the process.
func (c *MpesaClient) Post(endpoint string, payload interface{}) (*http.Response, error) {
	token, err := auth.GetAccessToken(c.Config)
	if err != nil {
		return nil, fmt.Errorf("failed to get access token: %w", err)
	}

	url := "https://sandbox.safaricom.co.ke" + endpoint
	if c.Config.Environment == "production" {
		url = "https://api.safaricom.co.ke" + endpoint
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal payload: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	return c.HTTP.Do(req)
}
