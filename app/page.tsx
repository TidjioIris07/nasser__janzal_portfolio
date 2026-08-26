import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Journey from '@/components/Journey'
import LogoMarquee from '@/components/LogoMarquee'
import Partnership from '@/components/Partnership'
import Services from '@/components/Services'

const Home = () => {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <Journey />
      <Impact />
      <Partnership />
      <Services />
    </main>
  )
}

export default Home