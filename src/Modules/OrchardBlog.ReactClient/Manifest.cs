using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "OrchardBlog.ReactClient",
    Author = "The Orchard Core Team",
    Website = "https://orchardcore.net",
    Version = "0.0.1",
    Description = "OrchardBlog.ReactClient",
    Dependencies = new[] {
        // https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore/OrchardCore.OpenId.Core/OpenIdConstants.cs
        "OrchardCore.OpenId",
        "OrchardCore.OpenId.Server",
        "OrchardCore.OpenId.Management",
        "OrchardCore.OpenId.Validation",
        "GraphQL"
    },
    Category = "Content Management"
)]
