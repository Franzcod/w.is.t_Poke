import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import Home from "./components/Home/Home.js";
import Footer from "./components/Footer/Footer.js";
import About from "./components/About/About.js";
import Init from "./components/Init/Init";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Init} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />

      <Route path="/" component={Footer} />
    </div>
  );
}
export default App;
