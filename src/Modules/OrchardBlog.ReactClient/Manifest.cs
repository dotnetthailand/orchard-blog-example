using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "OrchardBlog.ReactClient",
    Author = "The Orchard Core Team",
    Website = "https://orchardcore.net",
    Version = "0.0.1",
    Description = "OrchardBlog.ReactClient",
    Dependencies = new[] { "OrchardCore.Contents" },
    Category = "Content Management"
)]
