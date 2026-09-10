export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-10 mb-10">
      <div className="bg-white border-2 border-[#ffe3ec] rounded-3xl p-8 text-center shadow-sm">
        <h2 className="heading-font text-xl font-bold text-[#4a3b52] mb-2">
          Get in touch! 💌
        </h2>
        <p className="text-[#6b5877] mb-4">
          Feel free to reach out
        </p>
        <div className="flex justify-center gap-4 text-sm font-bold">
          <a href="mailto:c.vanduuren16@gmail.com" className="text-[#ff85a1] underline">
            Email
          </a>
          <a href="https://github.com/Cxthleen" className="text-[#7a63a8] underline">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cathleen-van-duuren-8731642bb" className="text-[#4a9c78] underline">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}