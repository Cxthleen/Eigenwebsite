
type Project = {
  name: string
  description: string
  link: string
  photo: string
}

export default function ProjectCard({
  name,
  description,
  link,
  photo,
}: Project) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="soft-card soft-card-hover group block h-full rounded-3xl border border-petal/60 bg-white/85 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-deep/25 hover:shadow-xl hover:shadow-mocha/10 dark:border-dark-line dark:bg-dark-surface/90"
    >
      {/* Image */}
        <div className="group/image">
          <div className="rotate-[-3deg] transition-transform duration-500 ease-out group-hover/image:rotate-0 group-hover/image:scale-[1.03]">
            <div className="soft-pill rounded-2xl bg-gradient-to-b from-white to-latte p-2 dark:from-dark-raised dark:to-dark-surface">
              <img
                src={photo}
                alt={name}
                className="h-36 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

      {/* Content */}
      <div className="px-1 pb-1 pt-5">
        <h3 className="heading-font text-xl font-bold text-ink transition-colors duration-300 hover:text-rose-deep dark:text-dark-ink dark:group-hover:text-rose">
          {name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft dark:text-dark-ink-soft">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-petal/50 pt-4 dark:border-dark-line">
          <span className="text-sm font-bold text-rose-deep dark:text-rose">
            View project
          </span>

          <span className="text-lg text-rose-deep transition-transform duration-300 group-hover:translate-x-1 dark:text-rose">
            →
          </span>
        </div>
      </div>
    </a>
  )
}