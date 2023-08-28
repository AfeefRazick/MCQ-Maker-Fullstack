import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage/Home"
import mainlinks from "./components/Linknames"
import { MCQBuilder } from "./pages/MCQBuilderPage/MCQBuilder"
import { MCEPage } from "./pages/MCEPage/MCEPage"
import { SignUpPage } from "./pages/SignUpSignInPage/SignUpPage"
import { DashboardPage } from "./pages/DashboardPage/DashboardPage"
import { PrivateRoutes } from "./components/PrivateRoutes"
import { Notfound } from "./pages/Notfound"
import { BuilderNotfound } from "./pages/BuilderNotfound"
import { SettingsPage } from "./pages/SettingsPage/SettingsPage"
import { ResponsesPage } from "./pages/ResponsesPage/ResponsesPage"
import { SubmissionPage } from "./pages/SubmissionPage/SubmissionPage"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          {/* <Route path="/loading" element={<Loading />}></Route> */}

          <Route element={<PrivateRoutes />}>
            <Route path="mcq/:mceid" element={<MCEPage />}></Route>
            <Route path="/mcq-builder/:mceid" element={<MCQBuilder />}></Route>

            <Route path="/submissions">
              <Route index path=":mceid" element={<ResponsesPage />}></Route>

              <Route
                path=":mceid/:submitterID"
                element={<SubmissionPage />}
              ></Route>
            </Route>

            <Route path="/mcq-builder/new" element={<MCQBuilder />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/settings" element={<SettingsPage />}></Route>
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

          <Route path="/builder-notfound" element={<BuilderNotfound />}></Route>
          {/* <Route path="/mcq-notfound" element={<MCENotfound />}></Route> */}

          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </Router>
    </>
  )
}
