import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import SpaceBackground from './components/SpaceBackground'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <SpaceBackground />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
