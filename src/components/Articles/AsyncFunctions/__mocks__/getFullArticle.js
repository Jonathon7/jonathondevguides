const article = [
  {
    id: 1,
    article_title: "How to Unit Test in React",
    date_posted: "17 March, 2019",
    article_description:
      "In this article, you will learn how to write unit tests for your React components. We will be using Jest and Enzyme.",
    article_content: JSON.stringify({
      blocks: [
        {
          key: "c6qsd",
          text: "Unit Testing in React With Jest",
          type: "header-one",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "88k8s",
          text: "14 March, 2019",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "ei9ns",
          text:
            "In this article, you will learn how to write unit tests for your React components. We will be using Jest and Enzyme.",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 116, key: 0 }],
          data: {}
        },
        {
          key: "hbej",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid repudiandae, autem quae et minima cum illum. Voluptates repellat ducimus, veniam natus voluptate, sapiente asperiores sit tempora impedit neque tempore aliquam.",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "88n1t",
          text:
            "Earum, eius. Ab a incidunt soluta unde harum! Hic officia quisquam, possimus similique ratione nemo nesciunt earum corporis dolore ex perspiciatis molestias tempore quia, exercitationem amet voluptas porro delectus magnam?",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "1qhf0",
          text:
            "Provident tenetur totam, voluptatem laboriosam corrupti accusantium iure voluptatum eveniet, est numquam corporis, ipsam eius placeat ratione fugit laudantium. Ut a pariatur nemo deserunt mollitia maiores tempore nihil voluptates accusamus!",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "cjk8m",
          text:
            "Dolorum animi est tenetur adipisci reprehenderit exercitationem quis? Eveniet exercitationem ab totam ex, assumenda soluta voluptatum perferendis. Consectetur ad autem, beatae blanditiis ut omnis dolorum quas minima pariatur. Ipsam, nihil! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid repudiandae, autem quae et minima cum illum. Voluptates repellat ducimus, veniam natus voluptate, sapiente asperiores sit tempora impedit neque tempore aliquam.",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "23htn",
          text:
            "Earum, eius. Ab a incidunt soluta unde harum! Hic officia quisquam, possimus similique ratione nemo nesciunt earum corporis dolore ex perspiciatis molestias tempore quia, exercitationem amet voluptas porro delectus magnam?",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "5r76t",
          text:
            "Provident tenetur totam, voluptatem laboriosam corrupti accusantium iure voluptatum eveniet, est numquam corporis, ipsam eius placeat ratione fugit laudantium. Ut a pariatur nemo deserunt mollitia maiores tempore nihil voluptates accusamus!",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "304i2",
          text:
            "Dolorum animi est tenetur adipisci reprehenderit exercitationem quis? Eveniet exercitationem ab totam ex, assumenda soluta voluptatum perferendis. Consectetur ad autem, beatae blanditiis ut omnis dolorum quas minima pariatur. Ipsam, nihil! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid repudiandae, autem quae et minima cum illum. Voluptates repellat ducimus, veniam natus voluptate, sapiente asperiores sit tempora impedit neque tempore aliquam.",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "c5g1h",
          text:
            "Earum, eius. Ab a incidunt soluta unde harum! Hic officia quisquam, possimus similique ratione nemo nesciunt earum corporis dolore ex perspiciatis molestias tempore quia, exercitationem amet voluptas porro delectus magnam?",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "7qvh5",
          text:
            "Provident tenetur totam, voluptatem laboriosam corrupti accusantium iure voluptatum eveniet, est numquam corporis, ipsam eius placeat ratione fugit laudantium. Ut a pariatur nemo deserunt mollitia maiores tempore nihil voluptates accusamus!",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: "ek90o",
          text:
            "Dolorum animi est tenetur adipisci reprehenderit exercitationem quis? Eveniet exercitationem ab totam ex, assumenda soluta voluptatum perferendis. Consectetur ad autem, beatae blanditiis ut omnis dolorum quas minima pariatur. Ipsam, nihil!",
          type: "header-two",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {
        "0": {
          type: "LINK",
          mutability: "MUTABLE",
          data: {
            href:
              "http://localhost:3000/article/Unit%20Testing%20in%20React%20With%20Jest",
            url:
              "http://localhost:3000/article/Unit%20Testing%20in%20React%20With%20Jest"
          }
        }
      }
    }),
    article_image: null,
    article_url:
      "http://localhost:3000/article/Unit%20Testing%20in%20React%20With%20Jest"
  }
];

export default () => {
  return new Promise(resolve => {
    resolve(article);
  });
};
