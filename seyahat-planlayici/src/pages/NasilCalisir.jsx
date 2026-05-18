import PageLayout from '../components/layout/PageLayout'
import { NASIL_CALISIR_STEPS } from '../constants/nasilCalisirSteps'

function NasilCalisir() {
  return (
    <PageLayout className="pt-32 pb-16 px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4">
            Nasıl Çalışır?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kendi seyahat planınızı oluşturmak sadece 4 basit adımdan ibaret.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NASIL_CALISIR_STEPS.map((step) => (
            <div
              key={step.no}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/80 shadow-sm relative overflow-hidden group"
            >
              <div className="text-6xl font-black text-indigo-50 absolute -top-4 -right-2 transition-transform group-hover:scale-110">
                {step.no}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default NasilCalisir
