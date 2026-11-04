import HeroSection from '../components/home/HeroSection'
import ServiceCategoryStrip from '../components/home/ServiceCategoryStrip'
import AIGovernmentServicesCard from '../components/home/AIGovernmentServicesCard'
import FeaturedSchemeCarousel from '../components/home/FeaturedSchemeCarousel'
import LatestUpdatesTimeline from '../components/home/LatestUpdatesTimeline'
import GovernmentStatisticsStrip from '../components/home/GovernmentStatisticsStrip'
import GovernmentInformationSection from '../components/home/GovernmentInformationSection'
import DepartmentPreview from '../components/home/DepartmentPreview'
import CitizenPortalPromotion from '../components/home/CitizenPortalPromotion'
import TransparencySection from '../components/home/TransparencySection'
import MobileAppPromotion from '../components/home/MobileAppPromotion'

export default function HomePage() {
  return (
    <main>
      {/* Section 3: Hero */}
      <HeroSection />

      {/* Section 4: Service Category Strip */}
      <ServiceCategoryStrip />

      {/* Section 5: Three-column feature section */}
      <section className="max-w-7xl mx-auto px-4 py-12 mt-4">
        <div className="grid lg:grid-cols-3 gap-5">
          <AIGovernmentServicesCard />
          <FeaturedSchemeCarousel />
          <LatestUpdatesTimeline />
        </div>
      </section>

      {/* Section 6: Statistics */}
      <GovernmentStatisticsStrip />

      {/* Section 7: Government Information */}
      <GovernmentInformationSection />

      {/* Section 8: Department Preview */}
      <DepartmentPreview />

      {/* Section 9: Citizen Portal Promotion */}
      <CitizenPortalPromotion />

      {/* Section 10: Transparency */}
      <TransparencySection />

      {/* Section 11: Mobile App */}
      <MobileAppPromotion />
    </main>
  )
}
