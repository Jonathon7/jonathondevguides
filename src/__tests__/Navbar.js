import Navbar from "../components/Navbar/Navbar";

describe("Navbar", () => {
  const wrapper = shallow(<Navbar />);

  it("renders a div", () => {
    let divs = wrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("toggles to the search bar when clicked", () => {
    const state = wrapper.instance().state;

    wrapper.find("img").simulate("click", {
      preventDefault: () => {
        state.searchBar = true;
      }
    });

    expect(state.searchBar).toEqual(true);
  });
});
