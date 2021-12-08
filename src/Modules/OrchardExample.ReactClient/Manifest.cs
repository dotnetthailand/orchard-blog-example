using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "OrchardExample.ReactClient",
    Author = "The Orchard Core Team",
    Website = "https://orchardcore.net",
    Version = "0.0.1",
    Description = "OrchardExample.ReactClient",
    Dependencies = new[] { "OrchardCore.Contents" },
    Category = "Content Management"
)]
