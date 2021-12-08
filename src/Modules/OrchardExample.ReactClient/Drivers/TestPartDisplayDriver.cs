using System.Threading.Tasks;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardExample.ReactClient.Models;
using OrchardExample.ReactClient.Settings;
using OrchardExample.ReactClient.ViewModels;

namespace OrchardExample.ReactClient.Drivers
{
    public class TestPartDisplayDriver : ContentPartDisplayDriver<TestPart>
    {
        private readonly IContentDefinitionManager _contentDefinitionManager;

        public TestPartDisplayDriver(IContentDefinitionManager contentDefinitionManager)
        {
            _contentDefinitionManager = contentDefinitionManager;
        }

        public override IDisplayResult Display(TestPart part, BuildPartDisplayContext context)
        {
            return Initialize<TestPartViewModel>(GetDisplayShapeType(context), m => BuildViewModel(m, part, context))
                .Location("Detail", "Content:10")
                .Location("Summary", "Content:10")
                ;
        }

        public override IDisplayResult Edit(TestPart part, BuildPartEditorContext context)
        {
            return Initialize<TestPartViewModel>(GetEditorShapeType(context), model =>
            {
                model.Show = part.Show;
                model.ContentItem = part.ContentItem;
                model.TestPart = part;
            });
        }

        public override async Task<IDisplayResult> UpdateAsync(TestPart model, IUpdateModel updater)
        {
            await updater.TryUpdateModelAsync(model, Prefix, t => t.Show);

            return Edit(model);
        }

        private Task BuildViewModel(TestPartViewModel model, TestPart part, BuildPartDisplayContext context)
        {
            var settings = context.TypePartDefinition.GetSettings<TestPartSettings>();

            model.ContentItem = part.ContentItem;
            model.MySetting = settings.MySetting;
            model.Show = part.Show;
            model.TestPart = part;
            model.Settings = settings;

            return Task.CompletedTask;
        }
    }
}
