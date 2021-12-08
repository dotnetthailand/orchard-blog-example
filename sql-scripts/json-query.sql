-- Get Blog JSON object
SELECT
  [Id],
  JSON_QUERY(Content, '$.BlogPost')
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'
