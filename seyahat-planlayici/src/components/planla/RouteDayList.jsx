import { Droppable, Draggable } from '@hello-pangea/dnd'
import RoutePlaceCard from './RoutePlaceCard'
import RouteSegment from './RouteSegment'

function RouteDayList({ droppableId, title, items, currency, rotaDetaylari, onPlaceSelect }) {
  return (
    <>
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-indigo-600 rounded-full" />
        {title} Akışı
      </h3>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 min-h-[150px] rounded-[2rem] transition-all p-2 ${
              snapshot.isDraggingOver ? 'bg-indigo-50/50 ring-2 ring-indigo-100 ring-dashed' : ''
            }`}
          >
            {items.length === 0 && (
              <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 text-center text-slate-400 text-sm font-medium bg-slate-50/50">
                Mekanları buraya sürükleyerek rotanı çizmeye başla.
              </div>
            )}

            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className="flex flex-col"
                  >
                    <RoutePlaceCard
                      item={item}
                      index={index}
                      currency={currency}
                      isDragging={dragSnapshot.isDragging}
                      onSelect={() => onPlaceSelect(item)}
                    />

                    {index < items.length - 1 && rotaDetaylari[index] && !dragSnapshot.isDragging && (
                      <RouteSegment leg={rotaDetaylari[index]} />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  )
}

export default RouteDayList
