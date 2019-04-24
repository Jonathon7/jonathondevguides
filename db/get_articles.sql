SELECT *
FROM articles
WHERE article_status = $1
ORDER BY id;