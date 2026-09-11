import Link from 'next/link'
import ProjectCard from '@/components/projectCard'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/" className="text-sm text-lavender hover:text-plum">
        ← back home
      </Link>

      <div className="flex items-center gap-3 mt-4 mb-8">
        <h1 className="heading-font text-3xl font-bold text-plum">
          My projects 🌷
        </h1>
        <span className="text-xs font-bold px-2.5 py-1 bg-pink-tag rounded-full text-pink-tag-text">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </main>
  )
}