using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace OrchardBlog.ReactClient.Settings
{
    public class TestPartSettingsViewModel
    {
        public string MySetting { get; set; }

        [BindNever]
        public TestPartSettings TestPartSettings { get; set; }
    }
}
