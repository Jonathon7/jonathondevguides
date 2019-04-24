import ArticleList from "../components/Articles/ArticleList/ArticleList";

jest.mock("../components/Articles/AsyncFunctions/getArticles");

it("retrieve all articles and store them in articles array", done => {
  const wrapper = shallow(<ArticleList />);

  process.nextTick(() => {
    wrapper.update();

    const state = wrapper.instance().state;

    expect(state.articles.length).toEqual(2);

    expect(state.articles[0].article_title).toEqual(
      "How to Unit Test in React"
    );

    expect(wrapper.find("ArticleListTemplate").length).toEqual(2);

    done();
  });
});
