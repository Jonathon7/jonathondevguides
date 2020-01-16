INSERT INTO articles
    (article_title, date_posted, article_description ,article_content, author)
VALUES($1, $2, $3, $4, $5);

SELECT id
FROM articles
WHERE id in (
    SELECT max(id)
FROM articles
);