import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Info, BookOpen, Monitor, HelpCircle, ChevronRight } from 'lucide-react'

const sections = [
  {
    key: 'govt_info',
    icon: Info,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    links: ['/about/tamil-nadu', '/about/government-structure', '/departments', '/about/leadership'],
  },
  {
    key: 'citizen',
    icon: BookOpen,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    links: ['/citizen-charter', '/resources/government-orders', '/resources/policies', '/resources/manuals'],
  },
  {
    key: 'digital',
    icon: Monitor,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    links: ['https://www.tn.gov.in/esevai', 'https://digilocker.gov.in', 'https://web.umang.gov.in', '/digital-initiatives'],
  },
  {
    key: 'assist',
    icon: HelpCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    links: ['/faqs', '/citizen-guide', '/help', '/contact'],
  },
]

export default function GovernmentInformationSection() {
  const { t } = useTranslation()

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('info_section.title')}</h2>
      <div className="w-16 h-1 bg-purple-600 rounded mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sections.map(({ key, icon: Icon, color, bg, border, links }) => {
          const section = t(`info_section.${key}`, { returnObjects: true })
          return (
            <div key={key} className={`bg-white border ${border} rounded-2xl p-5 hover:shadow-md transition-shadow`}>
              <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={links[i] || '#'}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors group"
                      target={links[i]?.startsWith('http') ? '_blank' : undefined}
                      rel={links[i]?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
