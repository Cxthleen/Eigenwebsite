import FloatingDecor from "./floatingDecor"
import ScrollReveal from "./scrollReveal"

type ContactLink = {
  label: string
  href: string
  bg: string
  text: string
  border: string
  external: boolean
}

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "/contact",
    bg: "bg-blush dark:bg-dark-raised",
    text: "text-rose-deep dark:text-dark-ink",
    border: "border-petal dark:border-dark-line",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/Cxthleen",
    bg: "bg-lilac/40 dark:bg-dark-raised",
    text: "text-lilac-deep dark:text-dark-ink",
    border: "border-lilac dark:border-dark-line",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cathleen-van-duuren-8731642bb",
    bg: "bg-sage/30 dark:bg-dark-raised",
    text: "text-sage-deep dark:text-dark-ink",
    border: "border-sage dark:border-dark-line",
    external: true,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-start relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-blush/40 to-lilac/30 px-6 py-24 dark:from-dark-bg dark:via-dark-surface dark:to-dark-raised"
    >
      {/* Soft ambient glow — behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-lilac/15 blur-[110px] dark:bg-dark-line/15" />
        <div className="absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-blush/25 blur-[120px] dark:bg-dark-raised/20" />
      </div>
      {/* Floating moon */}
        <FloatingDecor className="left-[12%] top-[18%] text-4xl opacity-40">
          🌙
        </FloatingDecor>

        {/* Floating stars */}
        <FloatingDecor
          className="right-[15%] top-[24%] text-2xl opacity-50"
          delay="1s"
        >
          ✦
        </FloatingDecor>

        <FloatingDecor
          className="bottom-[22%] left-[18%] text-xl opacity-40"
          delay="2.5s"
        >
          ✧
        </FloatingDecor>

        <FloatingDecor
  className="bottom-[16%] right-[12%] text-3xl opacity-30"
  delay="3.5s"
>
  ✦
</FloatingDecor>

      <ScrollReveal className="relative z-10 w-full">
        <div className="soft-card relative mx-auto w-full max-w-2xl rounded-[2rem] border border-petal/70 bg-gradient-to-br from-white/90 via-blush/50 to-lilac/30 p-8 text-center shadow-xl shadow-mocha/10 backdrop-blur-xl dark:border-dark-line dark:from-dark-surface/90 dark:via-dark-raised/80 dark:to-dark-surface sm:p-12">
          <span className="soft-pill mb-5 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/70 px-4 py-2 text-xs font-bold tracking-wide text-rose-deep dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink">
            <span>✦</span>
            LET&apos;S CONNECT
            <span>✦</span>
          </span>

          <h2 className="heading-font mb-3 text-3xl font-bold text-ink dark:text-dark-ink sm:text-4xl">
            Get in touch{" "}
            <span className="inline-block animate-sparkle">✨</span>
          </h2>

          <p className="mx-auto mb-9 max-w-md text-sm leading-7 text-ink-soft dark:text-dark-ink-soft sm:text-base">
            Always happy to chat
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`soft-pill inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-mocha/10 active:translate-y-0 ${link.bg} ${link.border} ${link.text}`}
              >
                {link.label}
                {link.external && (
                  <span className="text-xs opacity-60">↗</span>
                )}
              </a>
            ))}
          </div>

          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-petal to-transparent dark:via-dark-line" />

          <p className="mt-5 text-xs text-ink-soft/70 dark:text-dark-ink-soft/70">
            Made with a little bit of moonlight 🌙
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}