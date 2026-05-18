import { Link } from 'react-router-dom'

const SIZE_CLASSES = {
  sm: { icon: 'h-10 w-10 text-sm', text: 'text-xl' },
  md: { icon: 'h-10 w-10 text-sm', text: 'text-2xl' },
}

function BrandLogo({ variant = 'dark', size = 'sm', asLink = true, className = '' }) {
  const { icon, text } = SIZE_CLASSES[size] ?? SIZE_CLASSES.sm
  const titleClass = variant === 'light' ? 'text-white' : 'text-gray-800'

  const content = (
  <>
      <div
        className={`${icon} bg-gradient-to-br from-indigo-600 to-fuchsia-500 rounded-full text-white flex items-center justify-center font-black shadow-lg shadow-indigo-500/30 shrink-0`}
      >
        GM
      </div>
      <span className={`${text} font-bold tracking-tight ${titleClass}`}>
        Gezi<span className="text-fuchsia-500">Mimarı</span>
      </span>
    </>
  )

  if (asLink) {
    return (
      <Link
        to="/"
        className={`flex items-center gap-3 hover:opacity-80 transition-opacity w-max ${className}`}
      >
        {content}
      </Link>
    )
  }

  return <div className={`flex items-center gap-3 ${className}`}>{content}</div>
}

export default BrandLogo
