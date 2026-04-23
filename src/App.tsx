import './index.css'

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Lessons from "./pages/Lessons.tsx";
import Cards from "./pages/Cards.tsx";
import Header from "./components/Header.tsx";

function App() {

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/lekce" element={<Lessons/>}/>
          <Route path="/procvicovani" element={<Cards/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
