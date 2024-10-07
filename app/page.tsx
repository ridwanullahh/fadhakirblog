
import ThemeToggler from '../components/theme-toggler'
import Search from '../components/search'
import HomePage from '../components/home-page'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Fadhakir Blog</h1>
        <div className="flex items-center space-x-4">
          <Search />
          <ThemeToggler />
        </div>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  )
}
