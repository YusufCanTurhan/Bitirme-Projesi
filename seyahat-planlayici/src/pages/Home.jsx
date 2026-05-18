import PageLayout from '../components/layout/PageLayout'
import DestinationGallery from '../components/home/DestinationGallery'
import DestinationSearch from '../components/home/DestinationSearch'
import FeatureGrid from '../components/home/FeatureGrid'
import HeroSection from '../components/home/HeroSection'
import { useDestinationSearch } from '../hooks/useDestinationSearch'

function Home() {
  const { destinations, query, setQuery, results, firstResultId } = useDestinationSearch()

  return (
    <PageLayout className="overflow-hidden">
      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto relative z-10">
        <section className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 mt-8">
          <HeroSection />
          <DestinationSearch
            query={query}
            setQuery={setQuery}
            results={results}
            firstResultId={firstResultId}
          />
        </section>

        <FeatureGrid />
        <DestinationGallery destinations={destinations} />
      </main>
    </PageLayout>
  )
}

export default Home
