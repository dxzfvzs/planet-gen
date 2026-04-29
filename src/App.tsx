import './index.css'

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Lessons from "./pages/Lessons.tsx";
import Tests from "./pages/Tests.tsx";
import Cards from "./pages/Cards.tsx";
import Header from "./components/Header.tsx";
import Starfield from "./components/Starfield.tsx";

function App() {

  return (
    <>
      <Header/>
      <Starfield count={1500} />
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/lekce" element={<Lessons/>}/>
          <Route path="/test" element={<Tests/>}/>
          <Route path="/procvicovani" element={<Cards/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
