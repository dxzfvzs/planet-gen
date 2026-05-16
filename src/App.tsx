import './index.css'

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Header from "./components/Header.tsx";
import Starfield from "./components/Starfield.tsx";
import { GlobalSvgPlanetDefs } from "./components/Planet/GlobalSvgPlanetDefs.tsx";

function App() {

  return (
    <>
      <GlobalSvgPlanetDefs/>
      <Header/>
      <Starfield count={1500} />
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
