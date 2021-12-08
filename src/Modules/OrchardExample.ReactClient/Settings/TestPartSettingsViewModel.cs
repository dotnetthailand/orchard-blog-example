using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace OrchardExample.ReactClient.Settings
{
    public class TestPartSettingsViewModel
    {
        public string MySetting { get; set; }

        [BindNever]
        public TestPartSettings TestPartSettings { get; set; }
    }
}
