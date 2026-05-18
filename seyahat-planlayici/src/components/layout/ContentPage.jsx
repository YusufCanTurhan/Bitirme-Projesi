import PageLayout from './PageLayout'
import GlassCard from './GlassCard'

function ContentPage({ children, maxWidth = 'max-w-4xl', showOrbs = true }) {
  return (
    <PageLayout showOrbs={showOrbs} className="pt-32 pb-16 px-8">
      <GlassCard maxWidth={maxWidth}>{children}</GlassCard>
    </PageLayout>
  )
}

export default ContentPage
