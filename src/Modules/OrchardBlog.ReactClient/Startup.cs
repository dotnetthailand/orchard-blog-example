using System;
using Fluid;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Handlers;
using OrchardCore.ContentTypes.Editors;
using OrchardCore.Data.Migration;
using OrchardBlog.ReactClient.Drivers;
using OrchardBlog.ReactClient.Handlers;
using OrchardBlog.ReactClient.Models;
using OrchardBlog.ReactClient.Settings;
using OrchardBlog.ReactClient.ViewModels;
using OrchardCore.Modules;

namespace OrchardBlog.ReactClient
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.Configure<TemplateOptions>(o =>
            {
                o.MemberAccessStrategy.Register<TestPartViewModel>();
            });

            services.AddContentPart<TestPart>()
                .UseDisplayDriver<TestPartDisplayDriver>()
                .AddHandler<TestPartHandler>();

            services.AddScoped<IContentTypePartDefinitionDisplayDriver, TestPartSettingsDisplayDriver>();
            services.AddScoped<IDataMigration, Migrations>();
        }

        public override void Configure(IApplicationBuilder builder, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaControllerRoute(
                name: "Home",
                areaName: "OrchardBlog.ReactClient",
                pattern: "Home/Index",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}
