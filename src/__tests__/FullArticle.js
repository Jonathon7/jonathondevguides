import FullArticle from "../components/Articles/FullArticle/FullArticle";

jest.mock("../components/Articles/AsyncFunctions/getFullArticle");

describe("FullArticle", () => {
  const wrapper = shallow(
    <FullArticle
      match={{
        params: { id: "How to Unit Test in React" }
      }}
    />
  );

  it("always renders a div", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("retrieves one article and stores it in the article array", done => {
    process.nextTick(() => {
      wrapper.update();

      const state = wrapper.instance().state;

      expect(state.article.length).toEqual(1);

      expect(state.editorState).not.toBe("");

      done();
    });
  });
});
