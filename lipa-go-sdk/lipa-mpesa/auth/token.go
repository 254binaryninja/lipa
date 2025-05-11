package auth

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/254binaryninja/lipa-mpesa-go/config"
	"github.com/patrickmn/go-cache"
)

// tokenCache is an in-memory cache for storing the access token.
// The token is cached for 1 hour with a cleanup interval of 10 minutes.
var tokenCache = cache.New(1*time.Hour, 10*time.Minute)

// tokenResponse represents the JSON structure returned by the M-Pesa API
// when requesting an access token.
type tokenResponse struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   string `json:"expires_in"`
}

// GetAccessToken retrieves a valid M-Pesa API access token.
// It first checks the in-memory cache for an existing token.
// If not found, it requests a new token from the M-Pesa API using the provided config.
// The token is then cached for future use.
//
// Parameters:
//   - cfg: pointer to a Config struct containing API credentials and environment.
//
// Returns:
//   - string: the access token
//   - error: any error encountered during the process
func GetAccessToken(cfg *config.Config) (string, error) {
	if token, found := tokenCache.Get("access_token"); found {
		return token.(string), nil
	}

	url := "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
	if cfg.Environment == "production" {
		url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	// Encode the consumer key and secret as a base64 string for Basic Auth.
	credentials := base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", cfg.ConsumerKey, cfg.ConsumerSecret)))
	req.Header.Add("Authorization", fmt.Sprintf("Basic %s", credentials))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body:", err)
		}
	}(resp.Body)

	var tr tokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tr); err != nil {
		return "", err
	}

	// Cache the access token for 1 hour.
	tokenCache.Set("access_token", tr.AccessToken, time.Hour)
	return tr.AccessToken, nil
}
