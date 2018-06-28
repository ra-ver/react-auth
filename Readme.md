# Introduction

- install using `make`
- Adjust ui/App.js to include correct client_id and other details
- Adjust api/config.json before launching

  ```json
  {
    "oauth_client_id": "GITHUB_APPLICATION_CLIENT_ID",
    "oauth_client_secret": "GITHUB_APPLICATION_CLIENT_SECRET",
    "oauth_host": "github.com",
    "oauth_port": 443,
    "oauth_path": "/login/oauth/access_token",
    "oauth_method": "POST",
    "port": 9999
  }
  ```

- run using `npm run launch`
- this will launch both api server and ui server
