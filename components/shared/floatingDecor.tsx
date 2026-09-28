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
      className={`pointer-events-none absolute select-none animate-float text-[#c9a8f0] drop-shadow-[0_0_8px_rgba(201,168,240,0.6)] dark:text-[#fff3b0] dark:drop-shadow-[0_0_8px_rgba(255,243,176,0.5)] ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}
