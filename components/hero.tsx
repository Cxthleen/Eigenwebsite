import Link from 'next/link'

export default function Hero() {
  return (
    <header id="about" className="max-w-3xl mx-auto px-6 py-14 text-center">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 bg-blossom dark:bg-dark-border rounded-[45%_55%_60%_40%/50%_45%_55%_50%] rotate-6 animate-float"></div>
        <img
          src="/avatar2.jpeg"
          alt="Your photo"
          className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-dark-card shadow-md"
        />
      </div>

      <h1 className="heading-font text-3xl sm:text-4xl font-bold text-plum dark:text-dark-text">
        Hiii, I&apos;m Cathleen
      </h1>
      <p className="mt-4 text-base text-plum-soft dark:text-dark-text-soft leading-relaxed max-w-xl mx-auto">
        I&apos;m a student learning to build websites and applications. I love to create things that are both functional and visually appealing.
        This site is one of the first things I&apos;ve made with HTML and Tailwind CSS 💕
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/projects"
          className="px-5 py-2 bg-pink text-white rounded-full text-sm font-bold shadow-sm hover:bg-pink-hover animate-glow transition"
        >
          See my projects
        </Link>
        
        <a  href="/contact"
          className="px-5 py-2 bg-white dark:bg-dark-card border-2 border-blossom dark:border-dark-border rounded-full text-sm font-bold text-lavender dark:text-dark-text-soft hover:bg-pink-light dark:hover:bg-dark-border transition"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}