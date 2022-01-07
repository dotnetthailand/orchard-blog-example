using OrchardCore.ContentManagement.Metadata;
using OrchardCore.Data.Migration;

namespace OrchardBlog.ReactClient
{
    public class Migrations : DataMigration
    {
        IContentDefinitionManager _contentDefinitionManager;

        public Migrations(IContentDefinitionManager contentDefinitionManager)
        {
            _contentDefinitionManager = contentDefinitionManager;
        }

    }
}
