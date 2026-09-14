import Hero from '@/components/hero'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Divider from '@/components/divider'

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
    </main>
  )
}