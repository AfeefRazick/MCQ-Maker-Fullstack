import Sidebar from "../../components/Sidebar"
import Hero from "./components/Hero"
import Information from "./components/Information"

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="mt-16 md:mt-20">
        <Hero />
        <Information />
      </div>
    </>
  )
}
