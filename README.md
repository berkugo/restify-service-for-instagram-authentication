## restify service for instagram authentication

This restify service will be listening PORT 5000 as default.

*Change your oAuth redirect_uri as https://your-ip-address:yourport/auth on Facebook Developer Tools.*

If your app is in development mode, do not forget to add another tester account on your dashborad.

After authentcation step, the client or the tester will be redirected to https://your-ip-address:yourport/auth with a code parameter in query and then the script is going to take and use this code parameter to request for Short Lived Access Token from Instagram Basic Display API in the first place. After then another request will be sent to exchange your Short Lived Access Token with Long Live Access Token and will respond you this Long Lived Access Token data as a JSON object. 

Use these endpoints in your app while sending requests to fetch the data of related/authenticated user.

```
*- {your-ip-address}:{port}/getUserInfo/profile?access_token={generated-access-token} 
- {your-ip-address}:{port}/getUserInfo/media?access_token={generated-access-token}*
```





This script is using dotenv package. Create a .env file inside of the main folder then add these lines. 

- AUTH_POST=https://api.instagram.com/oauth/access_token
- CLIENT_ID={your-app-clientid}
- CLIENT_SECRET={your-app-secret}
- GRANT_TYPE=authorization_code
- REDIRECT_URI=https://your-ip-address:yourport/auth  


The response of the GET request will be in JSON format. 