import { HOME_FEATURES } from '../../constants/homeFeatures'

function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
      {HOME_FEATURES.map((item) => (
        <div
          key={item.title}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:bg-white hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
            {item.icon}
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-800">{item.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default FeatureGrid
