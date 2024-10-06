
import ThemeToggleButton from '../components/ThemeToggleButton'
import SearchComponent from '../components/SearchComponent'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Blog</h1>
          <div className="flex items-center space-x-4">
            <SearchComponent />
            <ThemeToggleButton />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center">
        &copy; 2023 My Blog. All rights reserved.
      </footer>
    </div>
  )
}
