# Introduction

- install using `make`
- Adjust ui/App.js to include correct client_id and other details
- Adjust api/config.json before launching

  ```json
  {
    "oauth_client_id": "CLIENT_ID",
    "oauth_client_secret": "CLIENT_SECRET",
    "oauth_host": "HOST",
    "oauth_redirect_uri": "http://localhost:3000",
    "oauth_grant_type": "authorization_code",
    "oauth_port": 443,
    "oauth_path": "TOKEN_URL",
    "oauth_method": "POST"
  }
  ```

- run using `npm run launch`
- this will launch both api server and ui server
