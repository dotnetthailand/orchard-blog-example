# orchard-blog-example

## slide
- https://docs.google.com/presentation/d/1XSEpT8dmNTgyoPm2OGvHeMPiVKHl4o7sFv8bHzhO_HQ/edit#slide=id.gc6f9e470d_0_0


## OpenId server
"OrchardCore.OpenId.Server",
"OrchardCore.OpenId.Management",
"OrchardCore.OpenId.Validation",

    {
      "name": "OpenIdServerSettings",
      "TestingModeEnabled": false,
      "AccessTokenFormat": "JsonWebToken",
      "Authority": "https://localhost:44342",
      "EnableTokenEndpoint": true,
      "EnableAuthorizationEndpoint": true,
      "EnableLogoutEndpoint": true,
      "EnableUserInfoEndpoint": true,
      "AllowPasswordFlow": true,
      "AllowClientCredentialsFlow": true,
      "AllowAuthorizationCodeFlow": true,
      "AllowRefreshTokenFlow": true,
      "AllowImplicitFlow": false,
      "AllowLogoutEndpoint": true,
      "AuthorizationEndpointPath": "https://localhost:44342/connect/authorize",
      "LogoutEndpointPath": "https://localhost:44342/connect/logout",
      "TokenEndpointPath": "https://localhost:44342/connect/token",
      "UserinfoEndpointPath": "https://localhost:44342/connect/userinfo"
    },
    {
      "DisplayName": "Authorization Code Flow",
      "name": "OpenIdApplication",
      "ClientId": "code_flow_client_id",
      "RedirectUris": "https://localhost:3000/signin-callback.html",
      "PostLogoutRedirectUris": "https://localhost:3000/",
      "AllowAuthorizationCodeFlow": true,
      "AllowLogoutEndpoint": true,
      "Type": "public"
    },
    {
      "name": "OpenIdScope",
      "Description": "A scope to provide api for remote clients",
      "DisplayName": "api Scope",
      "ScopeName": "api",
      "Resources": "my_recipient"
    },
    {
      "name": "OpenIdValidationSettings",
      "Audience": "my_recipient",
      "Authority": "https://localhost:44342"
    }


## TODO
