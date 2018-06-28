# Fence Auth Client

[Forked from Gatekeeper](https://github.com/prose/gatekeeper)

## API

```
GET http://localhost:9999/authenticate/TEMPORARY_CODE
```

## OAuth Steps

Also see the [documentation on Github](http://developer.github.com/v3/oauth/).

1.  Redirect users to request GitHub access.

    ```
    GET https://github.com/login/oauth/authorize
    ```

2.  GitHub redirects back to your site including a temporary code you need for the next step.

    You can grab it like so:

    ```js
    var code = window.location.href.match(/\?code=(.*)/)[1];
    ```

3.  Request the actual token using your instance of api, which knows your `client_secret`.

    ```js
    $.getJSON('http://localhost:9999/authenticate/' + code, function(data) {
      console.log(data.token);
    });
    ```

## Setup

1.  Adjust config.json before launching

    ```json
    {
      "oauth_client_id": "CLIENT_ID",
      "oauth_client_secret": "CLIENT_SECRET",
      "oauth_host": "HOST",
      "oauth_redirect_uri": "http://localhost:3000",
      "oauth_grant_type": "authorization_code",
      "oauth_port": 443,
      "oauth_path": "TOKEN_URL",
      "oauth_method": "POST",
      "port": 9999
    }
    ```

    You can also set environment variables to override the settings if you don't want Git to track your adjusted config.json file. Just use UPPER_CASE keys.```
