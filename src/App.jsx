import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import mainlinks from "./components/Linknames"
import { MCQBuilder } from "./pages/MCQBuilderPage/MCQBuilder"
import { MCEPage } from "./pages/MCEPage/MCEPage"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:mceid" element={<MCEPage />}></Route>

          <Route path="/mcq-builder" element={<MCQBuilder />}></Route>

          {mainlinks.map((link) => {
            return (
              <Route
                key={link.id}
                path={link.url}
                element={<link.rfcname />}
              ></Route>
            )
          })}
        </Routes>
      </Router>
    </>
  )
}
