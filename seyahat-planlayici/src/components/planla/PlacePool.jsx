import { Droppable, Draggable } from '@hello-pangea/dnd'
import { PLACES_COLUMN_ID } from '../../constants/days'
import PlacePoolCard from './PlacePoolCard'

function PlacePool({
  items,
  onPlaceSelect,
  poolCategories,
  categoryFilter,
  onCategoryFilterChange,
}) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-slate-300 rounded-full" />
        Mekan Havuzu
      </h3>

      {poolCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {poolCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryFilterChange(cat)}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tümü' : cat}
            </button>
          ))}
        </div>
      )}

      <Droppable droppableId={PLACES_COLUMN_ID}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4 pb-10">
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <PlacePoolCard
                      item={item}
                      isDragging={dragSnapshot.isDragging}
                      onSelect={() => onPlaceSelect(item)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default PlacePool
