function GlassCard({ children, className = '', maxWidth = 'max-w-4xl' }) {
  return (
    <div
      className={`${maxWidth} mx-auto bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-white/80 relative z-10 ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassCard
