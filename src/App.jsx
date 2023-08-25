import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage/Home"
import mainlinks from "./components/Linknames"
import { MCQBuilder } from "./pages/MCQBuilderPage/MCQBuilder"
import { MCEPage } from "./pages/MCEPage/MCEPage"
import { SignUpPage } from "./pages/SignUpSignInPage/SignUpPage"
import { DashboardPage } from "./pages/DashboardPage/DashboardPage"
import { PrivateRoutes } from "./components/PrivateRoutes"
import { ErrorPage } from "./pages/ErrorPage"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="mcq/:mceid" element={<MCEPage />}></Route>
            <Route path="/mcq-builder/:mceid" element={<MCQBuilder />}></Route>
            <Route path="/mcq-builder/new" element={<MCQBuilder />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
          </Route>

          {mainlinks.map((link) => {
            return (
              <Route
                key={link.id}
                path={link.url}
                element={<link.rfcname />}
              ></Route>
            )
          })}
          <Route path="/signup" element={<SignUpPage />}></Route>

          <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}
