using OrchardCore.ContentManagement.Handlers;
using System.Threading.Tasks;
using OrchardExample.ReactClient.Models;

namespace OrchardExample.ReactClient.Handlers
{
    public class TestPartHandler : ContentPartHandler<TestPart>
    {
        public override Task InitializingAsync(InitializingContentContext context, TestPart part)
        {
            part.Show = true;

            return Task.CompletedTask;
        }
    }
}