const projects = [
  {
    name: 'Project name',
    description: 'Bla bla bla bla',
    link: '#',
  },
  {
    name: 'Project name',
    description: 'Bla bla bla bla',
    link: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="heading-font text-xl font-bold text-[#4a3b52] mb-6">
        My little projects 🌷
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#ffe3ec] rounded-3xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="heading-font font-bold text-[#4a3b52]">{project.name}</h3>
            <p className="mt-2 text-sm text-[#6b5877]">{project.description}</p>
            
            <a  href={project.link}
              className="inline-block mt-3 text-sm font-bold text-[#ff85a1] underline"
            >
              view project →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}