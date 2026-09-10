import ProjectCard from './projectCard'

const projects = [
  {
    name: 'My website',
    description: 'Bla bla bla bla',
    link: '#',
  },
  {
    name: 'Boyfriend website',
    description: 'Bla bla bla bla',
    link: '#',
  },
]

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

      {/* relative + overflow-hidden lets us layer fade gradients on top of the edges */}
      <div className="group relative overflow-hidden">
        {/* Left fade: a gradient from the page background to transparent */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-pink-50 to-transparent z-10" />
        {/* Right fade, mirrored */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-pink-50 to-transparent z-10" />

        <div className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
          {loopedProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}