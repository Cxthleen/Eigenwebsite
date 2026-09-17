export default function Divider() {
  return (
    <div className="flex justify-center items-center gap-3 py-4" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-petal dark:to-dark-line" />
      <span className="text-sm animate-sparkle text-rose-deep/60 dark:text-rose/60">✨</span>
      <span className="w-1.5 h-1.5 rounded-full bg-mocha/40 dark:bg-dark-line" />
      <span className="text-sm animate-sparkle text-rose-deep/60 dark:text-rose/60" style={{ animationDelay: '1s' }}>✨</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-petal dark:to-dark-line" />
    </div>
  )
}