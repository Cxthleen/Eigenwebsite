type Skill = {
  name: string
  emoji: string
  bg: string
  text: string
}

const skills: Skill[] = [
  { name: 'HTML', emoji: '📄', bg: 'bg-pink-tag dark:bg-dark-card', text: 'text-pink-tag-text dark:text-dark-text' },
  { name: 'CSS / Tailwind', emoji: '🎨', bg: 'bg-lilac-tag dark:bg-dark-card', text: 'text-lilac-tag-text dark:text-dark-text' },
  { name: 'JavaScript', emoji: '⚡', bg: 'bg-mint-tag dark:bg-dark-card', text: 'text-mint-tag-text dark:text-dark-text' },
  { name: 'C#', emoji: '🦋', bg: 'bg-butter-tag dark:bg-dark-card', text: 'text-butter-tag-text dark:text-dark-text' },
  { name: 'React', emoji: '🪻', bg: 'bg-sky-tag dark:bg-dark-card', text: 'text-sky-tag-text dark:text-dark-text' },
  
]

export default function Skills() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="heading-font text-xl font-bold text-plum dark:text-dark-text mb-4">
        What I can do ✨
      </h2>
      <div className="flex flex-wrap gap-2.5">
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