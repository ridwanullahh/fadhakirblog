
import ThemeToggler from '../components/theme-toggler'
import Search from '../components/search'
import HomePage from '../components/home-page'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Fadhakir Blog</h1>
        <nav className="flex items-center space-x-4">
          <a href="/posts" className="text-lg">Posts Archive</a>
          <Search />
          <ThemeToggler />
        </nav>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  )
}
