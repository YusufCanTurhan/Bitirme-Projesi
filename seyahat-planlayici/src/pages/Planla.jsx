import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import appData from '../data.json'

function Planla() {
  const { id } = useParams()
  const [destination, setDestination] = useState(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [columns, setColumns] = useState({
    places: { id: 'places', title: '📍 Gezilecek Yerler', items: [] },
    day1: { id: 'day1', title: '📅 1. Gün Planı', items: [] },
    day2: { id: 'day2', title: '📅 2. Gün Planı', items: [] }
  })

  useEffect(() => {
    const foundDestination = appData.destinations.find(dest => dest.id === id)
    if (foundDestination) {
      setDestination(foundDestination)
      setColumns(prev => ({
        ...prev,
        places: { ...prev.places, items: foundDestination.places || [] }
      }))
    }
  }, [id])

  const onDragEnd = (result) => {
    const { source, destination: dest } = result
    if (!dest) return
    if (source.droppableId === dest.droppableId && source.index === dest.index) return

    const sourceCol = columns[source.droppableId]
    const destCol = columns[dest.droppableId]
    const sourceItems = [...sourceCol.items]
    const destItems = [...destCol.items]

    const [removed] = sourceItems.splice(source.index, 1)
    
    if (source.droppableId === dest.droppableId) {
      sourceItems.splice(dest.index, 0, removed)
      setColumns({ ...columns, [source.droppableId]: { ...sourceCol, items: sourceItems } })
    } else {
      destItems.splice(dest.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [dest.droppableId]: { ...destCol, items: destItems }
      })
    }
  }

  const handleResetPlan = () => {
    if (window.confirm("Tüm planı sıfırlamak istediğinize emin misiniz?")) {
      setColumns(prev => {
        const allItems = [...prev.places.items, ...prev.day1.items, ...prev.day2.items];
        return {
          ...prev,
          places: { ...prev.places, items: allItems },
          day1: { ...prev.day1, items: [] },
          day2: { ...prev.day2, items: [] }
        }
      });
    }
  }

  const handleSavePlan = () => {
    alert("🎉 Harika! Mimarinin başarıyla kaydedildi!");
  }

  const calculateExtraCost = () => {
    const day1Cost = columns.day1.items.reduce((total, item) => total + item.cost, 0);
    const day2Cost = columns.day2.items.reduce((total, item) => total + item.cost, 0);
    return day1Cost + day2Cost;
  }

  if (!destination) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 text-xl">Seyahat verileri yükleniyor... ⏳</div>

  const extraCost = calculateExtraCost();
  const uniqueCategories = ['Tümü', ...new Set(columns.places.items.map(item => item.category))]

  return (
    /* 1. FİZİK DÜZELTMESİ: overflow-hidden yerine overflow-x-hidden kullandık */
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 overflow-x-hidden relative">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-fuchsia-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-fuchsia-500 rounded-full text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-500/30">GM</div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Gezi<span className="text-fuchsia-500">Mimarı</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Keşfedin</Link>
          <span className="cursor-pointer hover:text-indigo-600 transition-colors">Topluluk</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-colors">Hakkımızda</span>
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold hidden md:inline">TRY</span>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-fuchsia-600 transition-colors shadow-lg shadow-slate-900/10">
            Giriş Yap
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/80">
          <div className="mb-6 lg:mb-0 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 border border-indigo-100">
              Mimar: Sen
            </div>
            <h1 className="text-5xl font-black text-slate-800 tracking-tighter mb-4 leading-tight">
              {destination.city} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-500">Mimarisi</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-3">Gidiş Tarihi</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white border border-gray-100 text-gray-700 text-sm font-medium rounded-full focus:ring-4 focus:ring-fuchsia-100 focus:border-fuchsia-400 block px-5 py-2.5 transition-all outline-none shadow-sm"
                />
              </div>
              <span className="text-gray-300 font-light mt-4">-</span>
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-3">Dönüş Tarihi</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white border border-gray-100 text-gray-700 text-sm font-medium rounded-full focus:ring-4 focus:ring-fuchsia-100 focus:border-fuchsia-400 block px-5 py-2.5 transition-all outline-none shadow-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-5 w-full lg:w-auto">
            <div className="flex items-center gap-4 bg-white p-5 rounded-[2rem] border border-gray-100 w-full lg:w-auto justify-between lg:justify-end shadow-sm">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Yatırım Tutarı</p>
                <p className="text-4xl font-black text-slate-900 transition-all duration-300">
                  {extraCost} <span className="text-lg text-gray-400">{destination.currency}</span>
                </p>
              </div>
              <div className="h-14 w-14 bg-fuchsia-100 text-fuchsia-600 rounded-full flex items-center justify-center text-2xl shadow-inner">
                💰
              </div>
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto">
              <button 
                onClick={handleResetPlan}
                className="flex-1 lg:flex-none px-6 py-3.5 text-sm font-bold text-gray-600 bg-white border border-gray-100 hover:bg-gray-50 hover:text-red-600 rounded-full transition-colors shadow-sm"
              >
                Planı Sıfırla
              </button>
              <button 
                onClick={handleSavePlan}
                className="flex-1 lg:flex-none px-10 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-full transition-colors shadow-lg shadow-slate-900/10"
              >
                Mimarini Kaydet
              </button>
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.values(columns).map((column) => {
              
              let displayedItems = column.items;
              if (column.id === 'places') {
                displayedItems = column.items.filter(item => {
                  const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
                  return matchesSearch && matchesCategory;
                });
              }

              return (
                /* 2. FİZİK DÜZELTMESİ: Sütunlardaki backdrop-blur-xl cam efektini kaldırdık ki motor sapıtmasın */
                <div key={column.id} className="bg-white/80 p-7 rounded-[2.5rem] flex flex-col border border-white shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                  
                  <div className="flex justify-between items-center mb-7 px-1">
                    <h3 className="font-black text-xl text-slate-800">{column.title}</h3>
                    {column.id !== 'places' && (
                      <span className="text-xs font-black bg-white text-indigo-600 px-4 py-2 rounded-full shadow-sm border border-indigo-100">
                        {column.items.reduce((sum, item) => sum + item.cost, 0)} {destination.currency}
                      </span>
                    )}
                  </div>

                  {column.id === 'places' && (
                    <div className="mb-7 space-y-4 px-1">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Mekan ara..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-100 bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-sm font-medium shadow-sm"
                        />
                        <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {uniqueCategories.map(cat => (
                          <button 
                            key={cat} 
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 shadow-sm border ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`space-y-4 rounded-[1.5rem] transition-all duration-300 flex-grow min-h-[300px] ${snapshot.isDraggingOver ? 'bg-indigo-50/50 p-2 border-2 border-dashed border-indigo-200' : ''}`}
                      >
                        {displayedItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  zIndex: snapshot.isDragging ? 9999 : 'auto'
                                }}
                                /* 3. FİZİK DÜZELTMESİ: Kartın Tailwind animasyonlarını (rotate-3 vb.) sildik, sadece gölge verdik */
                                className={`bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 flex flex-col group transition-shadow duration-200 ${snapshot.isDragging ? 'shadow-2xl ring-4 ring-indigo-500/20' : 'hover:shadow-xl'}`}
                              >
                                <div className="h-44 w-full relative overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.content} 
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Görsel+Bulunamadı' }}
                                    className="w-full h-full object-cover" 
                                  />
                                  <div className="absolute top-3 right-3 bg-white/95 px-3.5 py-2 rounded-full shadow-sm">
                                    <span className="text-sm font-black text-slate-900">{item.cost} <span className="text-[10px] text-gray-500 uppercase">{destination.currency}</span></span>
                                  </div>
                                  <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-700">
                                    <span className="text-fuchsia-400">★</span> {item.rating}
                                  </div>
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow bg-white">
                                  <h4 className="font-black text-slate-800 text-lg leading-tight mb-3.5">{item.content}</h4>
                                  <div className="mt-auto flex justify-start">
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                                      {item.category}
                                    </span>
                                  </div>
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
              );
            })}
          </div>
        </DragDropContext>
      </main>
    </div>
  )
}

export default Planla