# orchard-blog-example

localhost:5001

connection string
Orchard Blog
Blog recipe

SQL Server
Server=localhost, 1499;Database=orchard-blog;User Id=sa;Password=12345Abc$


admin
admin@dotnetthailand.com
12345Abc$

## slide

- [Query JSON in SQL Server](https://docs.google.com/presentation/d/1XSEpT8dmNTgyoPm2OGvHeMPiVKHl4o7sFv8bHzhO_HQ/edit#slide=id.gc6f9e470d_0_0)


## OpenId server
Enable the following features
// https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore/OrchardCore.OpenId.Core/OpenIdConstants.cs
- OrchardCore.OpenId
- OrchardCore.OpenId.Server
- OrchardCore.OpenId.Management
- OrchardCore.OpenId.Validation
- GraphQL

// https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore.Modules/OrchardCore.OpenId/Recipes/OpenIdServerSettingsStep.cs#L21

    {
      "name": "OpenIdServerSettings",
      "TestingModeEnabled": false,
      "AccessTokenFormat": "JsonWebToken",
      "Authority": "https://localhost:44342",
      "EnableTokenEndpoint": true,
      "EnableAuthorizationEndpoint": true,
      "EnableLogoutEndpoint": true,
      "EnableUserInfoEndpoint": true,

      "AllowPasswordFlow": false,
      "AllowClientCredentialsFlow": false,
      "AllowAuthorizationCodeFlow": true,
      "AllowRefreshTokenFlow": true,

      "AllowImplicitFlow": false,
      "AllowLogoutEndpoint": true,

      "AuthorizationEndpointPath": "https://localhost:44342/connect/authorize",
      "LogoutEndpointPath": "https://localhost:44342/connect/logout",
      "TokenEndpointPath": "https://localhost:44342/connect/token",
      "UserinfoEndpointPath": "https://localhost:44342/connect/userinfo"
    },
// src/Modules/OrchardBlog.ReactClient/src/components/Configuration.ts
    {
      "DisplayName": "Authorization Code Flow",
      "name": "OpenIdApplication",
      "ClientId": "code_flow_client_id",
      "RedirectUris": "https://localhost:5001/authorization/callback",
      "PostLogoutRedirectUris": "https://localhost:5001/authorization/logut",
      "AllowAuthorizationCodeFlow": true,
      "AllowLogoutEndpoint": true,
      "Type": "public"
    },

The consent type affects the way authorization requests are handled.
When the consent is explicit, the authorization request must be approved by the end user. This is the recommended option.
When the consent is implicit, the authorization request is assumed to be pre-approved and no consent form is displayed.
When the consent is external, the authorization request is rejected unless a pre-existing authorization (granted programmatically) already exists.

    {
      "name": "API scope",
      "ScopeName": "api",
      "DisplayName": "api Scope",
      "Description": "A scope to provide api for remote clients",
      "Resources": "my_recipient"
    },
    {
      "name": "OpenIdValidationSettings",
      "Audience": "my_recipient",
      "Authority": "https://localhost:44342"
    }


## TODO
