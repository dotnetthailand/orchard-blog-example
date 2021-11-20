-- Nested object
SELECT
  t.ContentItemId,
  t.Title as 'TitlePart.Title',
  m.Markdown as 'MarkdownBodyPart.Html'
FROM TitlePart t
  INNER join MarkdownBodyPart m
  ON t.ContentItemId = m.ContentItemId
FOR JSON PATH;

-- With root option
SELECT
  t.ContentItemId,
  t.Title as 'TitlePart.Title',
  m.Markdown as 'MarkdownBodyPart.Html'
FROM TitlePart t
  INNER join MarkdownBodyPart m
  ON t.ContentItemId = m.ContentItemId
FOR JSON PATH, ROOT('BlogPosts');

-- Auto
SELECT
  t.ContentItemId,
  t.Title
FROM TitlePart t
FOR JSON AUTO
