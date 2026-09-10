const skills = [
  { name: 'HTML', bg: 'bg-[#fce4ec]', text: 'text-[#a2678a]' },
  { name: 'CSS / Tailwind', bg: 'bg-[#e6dcfb]', text: 'text-[#7a63a8]' },
  { name: 'JavaScript', bg: 'bg-[#dcf7ea]', text: 'text-[#4a9c78]' },
  { name: 'React', bg: 'bg-[#fff2cc]', text: 'text-[#a68a2e]' },
]

export default function Skills() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="heading-font text-xl font-bold text-[#4a3b52] mb-4">
        What I can do ✨
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`px-3 py-1 ${skill.bg} rounded-full text-sm font-semibold ${skill.text}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  )
}