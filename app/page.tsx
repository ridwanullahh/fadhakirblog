
import ThemeToggler from '../components/theme-toggler'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Fadhakir Blog</h1>
        <ThemeToggler />
      </header>
      <main>
        {/* Other components will go here */}
      </main>
    </div>
  )
}
