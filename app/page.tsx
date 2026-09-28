import HeroMoon from '@/components/home/heroMoon'
import Skills from '@/components/home/skills'
import Projects from '@/components/home/projects'
import Contact from '@/components/home/contact'
import SmoothSections from '@/components/home/smoothSections'

export default function Home() {
  return (
    <main data-snap>
      <SmoothSections />
      <HeroMoon />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}