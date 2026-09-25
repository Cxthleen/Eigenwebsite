type FloatingDecorProps = {
  className?: string
  children: React.ReactNode
  delay?: string
}

export default function floatingDecor({
  className = "",
  children,
  delay = "0s",
}: FloatingDecorProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}