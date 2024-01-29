/* eslint-disable no-unused-vars */
import Home from "./pages/Home";
import GlobalStyles from "./components/GlobalStyles";
import {Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/GameRadar-Hub" element={<Home />}></Route>
        <Route path="/game/:id" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
