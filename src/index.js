import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      {routes}
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
