import './index.css'

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Starfield from "./components/Starfield.tsx";
import CreatePage from "./pages/CreatePage.tsx";

function App() {

  return (
    <>
      <Header/>
      <Starfield count={1500}/>
      <main>
        <Routes>
          <Route path="/" element={<CreatePage/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
