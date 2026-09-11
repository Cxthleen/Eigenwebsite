type Skill = {
  name: string
  emoji: string
  bg: string
  text: string
}

const skills: Skill[] = [
  { name: 'HTML', emoji: '📄', bg: 'bg-pink-tag', text: 'text-pink-tag-text' },
  { name: 'CSS / Tailwind', emoji: '🎨', bg: 'bg-lilac-tag', text: 'text-lilac-tag-text' },
  { name: 'JavaScript', emoji: '⚡', bg: 'bg-mint-tag', text: 'text-mint-tag-text' },
  { name: 'React', emoji: '🪻', bg: 'bg-butter-tag', text: 'text-butter-tag-text' },
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 ${skill.bg} rounded-full text-sm font-semibold ${skill.text} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <span>{skill.emoji}</span>
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  )
}