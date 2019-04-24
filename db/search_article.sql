SELECT *
FROM articles
WHERE article_title
ILIKE $1;