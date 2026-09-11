import Link from 'next/link'

type TimelineItem = {
  date: string
  title: string
  description: string
  emoji: string
}

const timeline: TimelineItem[] = [
  {
    date: '2023',
    title: 'Started studying',
    description: 'Began learning the basics of web development, native development and programming.',
    emoji: '🎓',
    },
  {
    date: '2024',
    title: 'Started my 1st internship',
    description: 'Began logging hours and building a 2D-platformer game in JavaScript.',
    emoji: '💼',
  },
  {
    date: '2026',
    title: 'Started my 2nd internship',
    description: 'Began logging hours and building real projects at my internship.',
    emoji: '💼',
  },
  {
    date: '2026',
    title: 'Built this portfolio',
    description: 'Made this site with Next.js, Tailwind, and a lot of trial and error.',
    emoji: '🌸',
  },
]

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/" className="text-sm text-lavender hover:text-plum">
        ← back home
      </Link>

      <h1 className="heading-font text-3xl font-bold text-plum mt-4 mb-6">
        About me 🌸
      </h1>

      <div className="bg-white border-2 border-pink-border rounded-3xl p-6 shadow-sm mb-10">
        <p className="text-plum-soft leading-relaxed">
          I'm Cathleen, a student learning to build websites and applications.
          I love creating things that are both functional and visually appealing,
          and I'm always looking for new things to learn. Outside of coding, I enjoy drawing and reading.
        </p>
      </div>

      <h2 className="heading-font text-xl font-bold text-plum mb-6">
        My journey 🌷
      </h2>

      <div className="relative pl-8">
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-pink-border" />

        <div className="flex flex-col gap-8">
          {timeline.map((item, index) => (
              <div key={index} className="relative">
                  
              <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-pink-tag border-2 border-white shadow-sm flex items-center justify-center text-xs">
                {item.emoji}
              </div>

              <div className="bg-white border-2 border-pink-border rounded-2xl p-4 shadow-sm">
                <span className="text-xs font-bold text-lavender uppercase tracking-wide">
                  {item.date}
                </span>
                <h3 className="heading-font font-bold text-plum mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-plum-soft mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}