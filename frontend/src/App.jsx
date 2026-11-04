import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import GovernmentUtilityBar from './components/layout/GovernmentUtilityBar'
import MainNavigation from './components/layout/MainNavigation'
import PublicFooter from './components/layout/PublicFooter'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PlaceholderPage from './pages/PlaceholderPage'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <GovernmentUtilityBar />
      <MainNavigation />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
