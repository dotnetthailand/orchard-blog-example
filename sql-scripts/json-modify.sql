-- Checking an updated result
SELECT JSON_MODIFY(Content, '$.DisplayText', 'Hello world')
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'

-- Update a title of a blog post
UPDATE Document
SET Content = JSON_MODIFY(Content, '$.DisplayText', 'Hello world')
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'

-- Verify
SELECT *
FROM Document
WHERE JSON_VALUE(Content, '$.ContentType') = 'BlogPost'
