-- In where clause
SELECT *
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'

-- In select & where clause
SELECT
  [Id],
  [Type],
  JSON_VALUE(Content, '$.MarkdownBodyPart.Markdown')
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'

-- Index of array element
SELECT
  [Id],
  JSON_VALUE(Content, '$.BlogPost.Image.Paths[0]') as CoverImage
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'

-- https://docs.microsoft.com/en-us/sql/t-sql/data-types/datetime2-transact-sql?view=sql-server-ver15
SELECT 
CONVERT(datetime2, JSON_VALUE(Content, '$.CreatedUtc')) AS CreatedUTC
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'
