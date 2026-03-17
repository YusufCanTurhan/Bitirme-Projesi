import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

function Planla() {
  const { id } = useParams()
  const [destination, setDestination] = useState(null)
  
  const [columns, setColumns] = useState({
    places: { id: 'places', title: '📍 Gezilecek Yerler', items: [] },
    day1: { id: 'day1', title: '📅 1. Gün Planı', items: [] },
    day2: { id: 'day2', title: '📅 2. Gün Planı', items: [] }
  })

  useEffect(() => {
    fetch(`http://localhost:3000/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data)
        setColumns(prev => ({
          ...prev,
          places: { ...prev.places, items: data.places || [] }
        }))
      })
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

  const calculateExtraCost = () => {
    const day1Cost = columns.day1.items.reduce((total, item) => total + item.cost, 0);
    const day2Cost = columns.day2.items.reduce((total, item) => total + item.cost, 0);
    return day1Cost + day2Cost;
  }

  if (!destination) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 text-xl">Seyahat verileri yükleniyor... ⏳</div>

  const extraCost = calculateExtraCost();

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Üst Kısım ve Dinamik Bütçe */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <Link to="/" className="text-gray-400 font-bold mb-2 inline-block hover:text-blue-600 transition-colors text-sm uppercase tracking-wider">&larr; Rotalara Dön</Link>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">{destination.city} <span className="text-blue-600">Planı</span></h1>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Toplam Aktivite</p>
              <p className="text-4xl font-black text-gray-900 transition-all duration-300">
                {extraCost} <span className="text-xl text-gray-400">{destination.currency}</span>
              </p>
            </div>
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl shadow-inner">
              💰
            </div>
          </div>
        </div>

        {/* Sürükle-Bırak Panosu */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="bg-gray-100/50 p-5 rounded-3xl flex flex-col border border-gray-200/60 shadow-inner">
                
                <div className="flex justify-between items-center mb-5 px-2">
                  <h3 className="font-extrabold text-lg text-gray-800">{column.title}</h3>
                  {column.id !== 'places' && (
                    <span className="text-sm font-bold bg-white text-blue-600 px-3 py-1.5 rounded-xl shadow-sm border border-gray-100">
                      {column.items.reduce((sum, item) => sum + item.cost, 0)} {destination.currency}
                    </span>
                  )}
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-4 rounded-2xl transition-all duration-300 flex-grow min-h-[250px] ${snapshot.isDraggingOver ? 'bg-blue-50/50 p-2 border-2 border-dashed border-blue-200' : ''}`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // KART TASARIMI (TRIPADVISOR TARZI)
                              className={`bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col group transition-all duration-200 ${snapshot.isDragging ? 'rotate-3 scale-105 shadow-2xl ring-4 ring-blue-500/20 z-50' : 'hover:shadow-lg hover:-translate-y-1'}`}
                            >
                              {/* Görsel Alanı */}
                              <div className="h-40 w-full relative overflow-hidden">
                                <img src={item.image} alt={item.content} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                
                                {/* Fiyat Etiketi (Cam Efektli) */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm">
                                  <span className="text-sm font-black text-gray-900">{item.cost} <span className="text-xs text-gray-500">{destination.currency}</span></span>
                                </div>
                                
                                {/* Yıldız / Puan */}
                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                  <span className="text-yellow-400">★</span> {item.rating}
                                </div>
                              </div>

                              {/* Metin Alanı */}
                              <div className="p-4 flex flex-col flex-grow bg-white">
                                <h4 className="font-extrabold text-gray-800 text-lg leading-tight mb-3">{item.content}</h4>
                                <div className="mt-auto flex justify-start">
                                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg">
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
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Planla