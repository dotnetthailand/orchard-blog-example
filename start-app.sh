#~ /bin/bash
yarn
yarn workspaces run dev

dotnet watch run --project ./src/OrchardBlog.Cms/OrchardBlog.Cms.csproj
# Server=localhost;Database=orchard-blog;User Id=sa;Password=12345Abc$
