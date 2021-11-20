
-- Check if JSON column
SELECT
  CASE
    WHEN ISJSON(Content) > 0 THEN 'JSON data'
    ELSE 'Not JSON data'
  END
FROM Document
WHERE [Type] = 'OrchardCore.ContentManagement.ContentItem, OrchardCore.ContentManagement.Abstractions'
