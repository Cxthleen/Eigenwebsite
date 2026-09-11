
export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-10 mb-10">
      <div className="bg-white border-2 border-pink-border rounded-3xl p-8 text-center shadow-sm">
        <h2 className="heading-font text-xl font-bold text-plum mb-2">
          Get in touch! 💌
        </h2>
        <p className="text-plum-soft mb-4">
          Feel free to reach out
        </p>
        <div className="flex justify-center gap-4 text-sm font-bold">
          <a href="/contact" className="text-pink underline">
            Email
          </a>
          <a href="https://github.com/Cxthleen" target="_blank" className="text-lilac-tag-text underline">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cathleen-van-duuren-8731642bb" target="_blank" className="text-mint-tag-text underline">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}