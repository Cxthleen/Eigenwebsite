type ContactLink = {
  label: string
  href: string
  bg: string
  text: string
  external: boolean
}

const contactLinks: ContactLink[] = [
  { label: 'Email', href: '/contact', bg: 'bg-pink-tag', text: 'text-pink-tag-text', external: false },
  { label: 'GitHub', href: 'https://github.com/Cxthleen', bg: 'bg-lilac-tag', text: 'text-lilac-tag-text', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cathleen-van-duuren-8731642bb', bg: 'bg-mint-tag', text: 'text-mint-tag-text', external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-10 mb-10">
      <div className="bg-white border-2 border-pink-border rounded-3xl p-8 text-center shadow-sm">
        <h2 className="heading-font text-xl font-bold text-plum mb-2">
          Get in touch! 💌
        </h2>
        <p className="text-plum-soft mb-6">
          Feel free to reach out
        </p>

        <div className="flex justify-center flex-wrap gap-3">
          {contactLinks.map((link) => (
            
            <a  key={link.label}
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={`inline-flex items-center gap-2 px-4 py-2 ${link.bg} rounded-full text-sm font-bold ${link.text} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}