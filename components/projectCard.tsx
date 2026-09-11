type Project = {
  name: string
  description: string
  link: string
  photo: string
}

export default function ProjectCard({ name, description, link, photo }: Project) {
  return (
    <div className="bg-white border-2 border-pink-border rounded-3xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
        <div className="bg-white border-4 border-pink-light rounded-2xl overflow-hidden shadow-sm">
          <img
            src={photo}
            alt={name}
            className="w-full h-32 object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="w-8 h-1.5 rounded-full mb-3" />
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