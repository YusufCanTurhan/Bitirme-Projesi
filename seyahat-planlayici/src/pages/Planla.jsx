import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import appData from '../data.json' 
import Harita from '../components/Harita'

function Planla() {
  const { id } = useParams()
  
  const destination = appData.destinations.find(d => d.id === id)
  const destinationPlaces = appData.places.filter(p => p.destinationId === id)

  const [rotaDetaylari, setRotaDetaylari] = useState([])
  const [aktifGun, setAktifGun] = useState('day1');
  
  // YENİ STATE: Haritada gösterilmek üzere tıklanan mekanı tutacak
  const [odaklanilacakMekan, setOdaklanilacakMekan] = useState(null);

  const [columns, setColumns] = useState({
    places: { id: 'places', title: 'Mekan Havuzu', items: destinationPlaces },
    day1: { id: 'day1', title: '1. Gün', items: [] },
    day2: { id: 'day2', title: '2. Gün', items: [] },
    day3: { id: 'day3', title: '3. Gün', items: [] }
  });

  const onDragEnd = (result) => {
    const { source, destination: dropDest } = result
    if (!dropDest) return
    if (source.droppableId === dropDest.droppableId && source.index === dropDest.index) return

    const sourceCol = columns[source.droppableId]
    const destCol = columns[dropDest.droppableId]
    const sourceItems = [...sourceCol.items]
    const destItems = [...destCol.items]
    const [removed] = sourceItems.splice(source.index, 1)

    if (source.droppableId === dropDest.droppableId) {
      sourceItems.splice(dropDest.index, 0, removed)
      setColumns({ ...columns, [source.droppableId]: { ...sourceCol, items: sourceItems } })
    } else {
      destItems.splice(dropDest.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [dropDest.droppableId]: { ...destCol, items: destItems }
      })
    }
  }

  const totalCost = ['day1', 'day2', 'day3'].reduce((sum, day) => {
    return sum + columns[day].items.reduce((daySum, item) => daySum + (item.cost || 0), 0);
  }, 0);

  if (!destination) return <div className="pt-40 text-center">Şehir bulunamadı.</div>

  return (
    <div className="h-screen w-full bg-[#F8FAFC] font-sans text-gray-900 flex overflow-hidden">
      
      {/* SOL KOLON */}
      <div className="hidden lg:block w-[55%] h-full relative z-0">
        <Harita 
          places={destinationPlaces} 
          routePlaces={columns[aktifGun].items} 
          setRotaDetaylari={setRotaDetaylari} 
          // YENİ: Haritaya sinyali gönderiyoruz
          odaklanilacakMekan={odaklanilacakMekan}
          setOdaklanilacakMekan={setOdaklanilacakMekan}
        />
        <Link to="/" className="absolute top-6 left-6 z-[1000] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-white transition-all border border-slate-100 flex items-center gap-2">
          <span className="text-lg">←</span> Ana Sayfa
        </Link>
      </div>

      {/* SAĞ KOLON */}
      <div className="w-full lg:w-[45%] h-full flex flex-col bg-white border-l border-slate-200 shadow-[-10px_0_30px_rgba(0,0,0,0.03)] relative z-10 overflow-hidden">
        
        <div className="p-8 pb-6 shrink-0">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-black mb-3 tracking-tight">{destination?.city} Macerası</h1>
              <p className="text-indigo-100 text-sm font-medium mb-6 flex items-center gap-2">
                <span className="text-base">📍</span> {destination?.country}
              </p>
              <div className="flex gap-3">
                <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-black tracking-widest block opacity-70 mb-0.5">Toplam Bütçe</span>
                  <span className="text-xl font-black">{totalCost} {destination?.currency}</span>
                </div>
                <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center">
                  <span className="text-xs font-bold">Kişisel Rota</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 flex flex-col min-h-0 px-8 pb-8 overflow-hidden">
            
            <div className="flex gap-3 mb-6 shrink-0">
              {['day1', 'day2', 'day3'].map((gun, index) => (
                <button 
                  key={gun}
                  onClick={() => setAktifGun(gun)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    aktifGun === gun 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {index + 1}. Gün
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                {columns[aktifGun].title} Akışı
              </h3>

              <Droppable droppableId={aktifGun}>
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-[150px] rounded-[2rem] transition-all p-2 ${snapshot.isDraggingOver ? 'bg-indigo-50/50 ring-2 ring-indigo-100 ring-dashed' : ''}`}
                  >
                    {columns[aktifGun].items.length === 0 && (
                       <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 text-center text-slate-400 text-sm font-medium bg-slate-50/50">
                         Mekanları buraya sürükleyerek rotanı çizmeye başla.
                       </div>
                    )}

                    {columns[aktifGun].items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col"
                          >
                            {/* YENİ: Kartın üzerine tıklandığında haritada o konuma odaklan */}
                            <div 
                              onClick={() => setOdaklanilacakMekan(item)}
                              className={`bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex gap-5 transition-all cursor-pointer ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-indigo-500 scale-[1.02] z-[2000]' : 'hover:shadow-md hover:border-indigo-200'}`}
                            >
                              <div className="relative shrink-0">
                                <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-inner" alt="" />
                                <div className="absolute -top-2 -left-2 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black border-4 border-white">
                                  {index + 1}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-black text-slate-800 text-lg">{item.content}</h4>
                                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                                    {item.cost === 0 ? 'Ücretsiz' : `${item.cost} ${destination?.currency}`}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                    {item.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {index < columns[aktifGun].items.length - 1 && rotaDetaylari[index] && !snapshot.isDragging && (
                              <div className="flex flex-col items-center justify-center mt-2 mb-1">
                                <div className="w-0.5 h-3 bg-indigo-200 border-l-2 border-dashed border-indigo-300"></div>
                                <span className="bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2 text-xs font-black text-indigo-600 shadow-sm z-10">
                                  🚶‍♂️ {rotaDetaylari[index].duration.text} • {rotaDetaylari[index].distance.text}
                                </span>
                                <div className="w-0.5 h-3 bg-indigo-200 border-l-2 border-dashed border-indigo-300"></div>
                              </div>
                            )}

                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="mt-8">
                 <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                   Mekan Havuzu
                 </h3>
                 
                 <Droppable droppableId="places">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4 pb-10">
                      {columns.places.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setOdaklanilacakMekan(item)} // YENİ: Mekan havuzundaki kartlara da tıklama ekledik
                              className={`bg-white border border-slate-100 rounded-2xl p-3 shadow-sm flex items-center gap-3 transition-all cursor-pointer ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-indigo-500 z-[2000]' : 'hover:border-indigo-200 hover:shadow-md'}`}
                            >
                              <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                              <div className="min-w-0">
                                <h4 className="font-bold text-slate-800 text-[11px] truncate leading-tight">{item.content}</h4>
                                <p className="text-[9px] font-black text-indigo-500 uppercase mt-0.5 tracking-tighter">{item.category}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Planla