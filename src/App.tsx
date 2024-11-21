import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Home />
      <Toaster></Toaster>
    </>
  );
}

export default App;
