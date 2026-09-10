import Image from "next/image"

export default function Hero() {
  return (
    <header id="about" className="max-w-3xl mx-auto px-6 py-14 text-center">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 bg-[#ffd3e0] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] rotate-6"></div>
        <Image
          src="https://placehold.co/120x120"
          alt="Your photo"
          width={120}
          height={120}
          className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
      </div>

      <h1 className="heading-font text-3xl sm:text-4xl font-bold text-[#4a3b52]">
        Hiii, Im Cathleen
      </h1>
      <p className="mt-4 text-base text-[#6b5877] leading-relaxed max-w-xl mx-auto">
              Im a student learning to build websites and applications. I love to create things that are both functional and visually appealing.
              This site is one of the first things Ive made with HTML and Tailwind CSS 💕
      </p>

      <div className="mt-6 flex justify-center gap-3">
        
          <a href="#projects"
          className="px-5 py-2 bg-[#ff9eb5] text-white rounded-full text-sm font-bold shadow-sm hover:bg-[#ff85a1] transition"
        >
          See my projects
        </a>
        
          < a href="#contact"
          className="px-5 py-2 bg-white border-2 border-[#ffd3e0] rounded-full text-sm font-bold text-[#8a6d9c] hover:bg-[#fff0f4] transition"
        >
          Get in touch
        </a>
      </div>
    </header>
  )
}