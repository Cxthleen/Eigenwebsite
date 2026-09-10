type Project = {
  name: string
  description: string
  link: string
}

export default function ProjectCard({ name, description, link }: Project) {
  return (
    <div className="shrink-0 w-64 bg-white border-2 border-pink-border rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-8 h-1.5 bg-pink rounded-full mb-3" />
      <h3 className="heading-font font-bold text-plum">{name}</h3>
      <p className="mt-2 text-sm text-plum-soft">{description}</p>
      
        <a href={link}
        className="inline-block mt-3 text-sm font-bold text-pink hover:text-pink-hover underline"
      >
        view project →
      </a>
    </div>
  )
}