using OrchardCore.ContentManagement.Handlers;
using System.Threading.Tasks;
using OrchardBlog.ReactClient.Models;

namespace OrchardBlog.ReactClient.Handlers
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
