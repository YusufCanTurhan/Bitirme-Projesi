function RouteSegment({ leg }) {
  if (!leg) return null

  return (
    <div className="flex flex-col items-center justify-center mt-2 mb-1">
      <div className="w-0.5 h-3 bg-indigo-200 border-l-2 border-dashed border-indigo-300" />
      <span className="bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2 text-xs font-black text-indigo-600 shadow-sm z-10">
        🚗 {leg.duration.text} • {leg.distance.text}
      </span>
      <div className="w-0.5 h-3 bg-indigo-200 border-l-2 border-dashed border-indigo-300" />
    </div>
  )
}

export default RouteSegment
