# shopify-Oauth
This is the backend implementation of how oAuth2.0, In this i have achieved the functionality to intially how to authorize the store when store install our app.
During installing shop owner will agree to the access scopes which is required by app, if the scopes are suspicious then store can avoid the installing the app.
After installing the app our redirect or callback url which we have set up during the app creation is redirected after that we got request object in req.query for key 
value pairs of shop, hmac for validation, code and timestamps.

we will validate the hmac by our client secret.

after validating we will obtain the access token from the shopify. Because only the access token will give us permission to access shopify API's endpoint.
