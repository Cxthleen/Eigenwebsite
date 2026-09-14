type ContactLink = {
  label: string
  href: string
  emoji: string
  bg: string
  text: string
  external: boolean
}

const contactLinks: ContactLink[] = [
  { label: 'Email', href: '/contact', emoji: '📧', bg: 'bg-pink-tag dark:bg-dark-card', text: 'text-pink-tag-text dark:text-dark-text', external: false },
  { label: 'GitHub', href: 'https://github.com/Cxthleen', emoji: '🐙', bg: 'bg-lilac-tag dark:bg-dark-card', text: 'text-lilac-tag-text dark:text-dark-text', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cathleen-van-duuren-8731642bb', emoji: '💼', bg: 'bg-mint-tag dark:bg-dark-card', text: 'text-mint-tag-text dark:text-dark-text', external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-10 mb-10">
      <div className="bg-white dark:bg-dark-card border-2 border-pink-border dark:border-dark-border rounded-3xl p-8 text-center shadow-sm">
        <h2 className="heading-font text-xl font-bold text-plum dark:text-dark-text mb-2">
          Get in touch! 💌
        </h2>
        <p className="text-plum-soft dark:text-dark-text-soft mb-6">
          Feel free to reach out
        </p>

        <div className="flex justify-center flex-wrap gap-3">
          {contactLinks.map((link) => (
            
            <a  key={link.label}
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={`inline-flex items-center gap-2 px-4 py-2 ${link.bg} rounded-full text-sm font-bold ${link.text} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <span>{link.emoji}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}