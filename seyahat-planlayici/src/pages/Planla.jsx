import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DragDropContext } from '@hello-pangea/dnd'
import Harita from '../components/Harita'
import BudgetPanel from '../components/planla/BudgetPanel'
import DayTabs from '../components/planla/DayTabs'
import MobileViewTabs from '../components/planla/MobileViewTabs'
import PlacePool from '../components/planla/PlacePool'
import PlanToolbar from '../components/planla/PlanToolbar'
import RouteDayList from '../components/planla/RouteDayList'
import TripHeader from '../components/planla/TripHeader'
import { useTripPlanner } from '../hooks/useTripPlanner'

function Planla() {
  const { id } = useParams()
  const [mobileView, setMobileView] = useState('plan')

  const planner = useTripPlanner(id)
  const {
    destination,
    mapPlaces,
    columns,
    dayIds,
    aktifGun,
    setAktifGun,
    odaklanilacakMekan,
    setOdaklanilacakMekan,
    rotaDetaylari,
    setRotaDetaylari,
    onDragEnd,
    totalCost,
    costByCategory,
    budgetLimit,
    setBudgetLimit,
    isOverBudget,
    saveStatus,
    handleAddDay,
    handleRemoveDay,
    handleClearPlan,
    handleManualSave,
    categoryFilter,
    setCategoryFilter,
    poolCategories,
    filteredPoolItems,
    canAddDay,
    canRemoveDay,
  } = planner

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-8">
        <div className="text-center max-w-md">
          <span className="text-4xl block mb-4">🧭</span>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Şehir bulunamadı</h1>
          <p className="text-slate-500 mb-6">Aradığınız destinasyon listede yok.</p>
          <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-bold">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  const activeColumn = columns[aktifGun]

  const mapPanel = (
    <Harita
      places={mapPlaces}
      routePlaces={activeColumn?.items ?? []}
      setRotaDetaylari={setRotaDetaylari}
      odaklanilacakMekan={odaklanilacakMekan}
      setOdaklanilacakMekan={setOdaklanilacakMekan}
    />
  )

  return (
    <div className="h-screen w-full bg-[#F8FAFC] font-sans text-gray-900 flex flex-col lg:flex-row overflow-hidden">
      <div
        className={`${
          mobileView === 'map' ? 'flex' : 'hidden'
        } lg:flex lg:w-[55%] h-[45vh] lg:h-full relative z-0 shrink-0`}
      >
        {mapPanel}
        <Link
          to="/"
          className="absolute top-4 left-4 lg:top-6 lg:left-6 z-[1000] bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-white transition-all border border-slate-100 flex items-center gap-2"
        >
          <span className="text-lg">←</span> Ana Sayfa
        </Link>
      </div>

      <div
        className={`${
          mobileView === 'plan' ? 'flex' : 'hidden'
        } lg:flex w-full lg:w-[45%] flex-1 min-h-0 flex-col bg-white border-l border-slate-200 shadow-[-10px_0_30px_rgba(0,0,0,0.03)] relative z-10 overflow-hidden`}
      >
        <MobileViewTabs activeView={mobileView} onViewChange={setMobileView} />

        <TripHeader destination={destination} totalCost={totalCost} isOverBudget={isOverBudget} />

        <PlanToolbar
          saveStatus={saveStatus}
          onSave={handleManualSave}
          onClear={() => {
            if (window.confirm('Planınız silinecek. Emin misiniz?')) handleClearPlan()
          }}
        />

        <BudgetPanel
          totalCost={totalCost}
          currency={destination.currency}
          budgetLimit={budgetLimit}
          onBudgetLimitChange={setBudgetLimit}
          isOverBudget={isOverBudget}
          costByCategory={costByCategory}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 flex flex-col min-h-0 px-8 pb-8 overflow-hidden">
            <DayTabs
              dayIds={dayIds}
              aktifGun={aktifGun}
              onDayChange={setAktifGun}
              onAddDay={handleAddDay}
              onRemoveDay={handleRemoveDay}
              canAddDay={canAddDay}
              canRemoveDay={canRemoveDay}
            />

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {activeColumn && (
                <RouteDayList
                  droppableId={aktifGun}
                  title={activeColumn.title}
                  items={activeColumn.items}
                  currency={destination.currency}
                  rotaDetaylari={rotaDetaylari}
                  onPlaceSelect={setOdaklanilacakMekan}
                />
              )}
              <PlacePool
                items={filteredPoolItems}
                onPlaceSelect={setOdaklanilacakMekan}
                poolCategories={poolCategories}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Planla
