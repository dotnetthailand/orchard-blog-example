-- Get Blog JSON object
SELECT
  [Id],
  JSON_Query(Content, '$.BlogPost')
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'
