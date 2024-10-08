
import ThemeToggler from '../components/theme-toggler'
import Search from '../components/search'
import HomePage from '../components/home-page'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Fadhakir Blog</h1>
        <nav className="flex items-center space-x-4">
<Link href="/posts" legacyBehavior><a className="text-lg">Posts Archive</a></Link>
<Link href="/category/Tech" legacyBehavior><a className="text-lg">Tech</a></Link>
<Link href="/category/Health" legacyBehavior><a className="text-lg">Health</a></Link>
<Link href="/category/Lifestyle" legacyBehavior><a className="text-lg">Lifestyle</a></Link>
<Link href="/admin" legacyBehavior><a className="text-lg">Admin</a></Link>
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
