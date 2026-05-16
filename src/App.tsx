import './index.css'

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Header from "./components/Header.tsx";
import Starfield from "./components/Starfield.tsx";
import { GlobalSvgPlanetDefs } from "./components/planet/GlobalSvgPlanetDefs.tsx";
import CreatePage from "./pages/CreatePage.tsx";

function App() {

  return (
    <>
      <GlobalSvgPlanetDefs/>
      <Header/>
      <Starfield count={1500} />
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
