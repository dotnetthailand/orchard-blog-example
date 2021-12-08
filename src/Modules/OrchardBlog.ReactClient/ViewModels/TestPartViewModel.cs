using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentManagement;
using OrchardBlog.ReactClient.Models;
using OrchardBlog.ReactClient.Settings;

namespace OrchardBlog.ReactClient.ViewModels
{
    public class TestPartViewModel
    {
        public string MySetting { get; set; }

        public bool Show { get; set; }

        [BindNever]
        public ContentItem ContentItem { get; set; }

        [BindNever]
        public TestPart TestPart { get; set; }

        [BindNever]
        public TestPartSettings Settings { get; set; }
    }
}
