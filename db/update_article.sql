UPDATE articles SET article_title = $1,
                date_posted = $2,
                article_description = $3,
                article_content = $4,
                article_status = $6
                 WHERE id = $5;

SELECT id
FROM articles
WHERE id = $5;

