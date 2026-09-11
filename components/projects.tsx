import ProjectCard from '@/components/projectCard'
import { projects } from '@/lib/projects'

export default function Projects() {
  const loopedProjects = [...projects, ...projects]

  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="heading-font text-xl font-bold text-plum">
          My little projects 🌷
        </h2>
        <span className="text-xs font-bold px-2.5 py-1 bg-pink-tag rounded-full text-pink-tag-text">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-pink-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-pink-50 to-transparent z-10" />

        <div className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
          {loopedProjects.map((project, index) => (
            <div key={index} className="shrink-0 w-64">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}