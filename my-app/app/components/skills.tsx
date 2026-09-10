const skills = [
  { name: 'HTML', bg: 'bg-pink-tag', text: 'text-pink-tag-text' },
  { name: 'CSS / Tailwind', bg: 'bg-lilac-tag', text: 'text-lilac-tag-text' },
  { name: 'JavaScript', bg: 'bg-mint-tag', text: 'text-mint-tag-text' },
  { name: 'React', bg: 'bg-butter-tag', text: 'text-butter-tag-text' },
]

export default function Skills() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="heading-font text-xl font-bold text-plum mb-4">
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