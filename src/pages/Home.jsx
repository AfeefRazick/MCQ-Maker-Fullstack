import Hero from "../components/Hero"
import Information from "../components/Information"
import Sidebar from "../components/Sidebar"

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
