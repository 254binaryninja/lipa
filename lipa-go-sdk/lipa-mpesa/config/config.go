package config

import (
	"github.com/go-playground/validator/v10"
	"os"
)

type Config struct {
	ConsumerKey    string `validate:"required"`
	ConsumerSecret string `validate:"required"`
	ShortCode      string `validate:"required"`
	PassKey        string `validate:"required"`
	Environment    string `validate:"required"`
	CallbackURL    string `validate:"required"`
}

func LoadConfig() (*Config, error) {
	cfg := &Config{
		ConsumerKey:    os.Getenv("CONSUMER_KEY"),
		ConsumerSecret: os.Getenv("CONSUMER_SECRET"),
		ShortCode:      os.Getenv("SHORT_CODE"),
		PassKey:        os.Getenv("PASSKEY"),
		Environment:    os.Getenv("ENVIRONMENT"),
		CallbackURL:    os.Getenv("CALLBACK_URL"),
	}

	validate := validator.New()
	if err := validate.Struct(cfg); err != nil {
		return nil, err
	}

	return cfg, nil
}
