const articles = [
  {
    id: 1,
    article_title: "How to Unit Test in React",
    date_posted: "17 March, 2019",
    article_description:
      "In this article, you will learn how to write unit tests for your React components. We will be using Jest and Enzyme.",
    article_content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "
  },
  {
    id: 2,
    article_title: "Animate Elements When Scrolled Into View With JavaScript",
    date_posted: "15 March, 2019",
    article_description:
      "In this tutorial you will learn how to animate HTML elements with JavaScript and CSS using the 'scroll' event listener.",
    article_content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "
  }
];

export default async () => {
  return await new Promise(resolve => {
    resolve(articles);
  });
};
