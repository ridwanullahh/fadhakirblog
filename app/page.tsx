import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">My Blog</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/categories" className="hover:underline">Categories</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <article className="mb-8">
            <Image
              src="/path/to/image.jpg"
              alt="Post Image"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <h3 className="text-xl font-bold mt-2">Post Title</h3>
            <p className="text-gray-700">Post excerpt goes here...</p>
            <a href="/post/1" className="text-blue-500 hover:underline">Read more</a>
          </article>
          <!-- Repeat for more posts -->
        </section>
        <aside>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="mb-8">
            <li><a href="/category/tech" className="hover:underline">Tech</a></li>
            <li><a href="/category/lifestyle" className="hover:underline">Lifestyle</a></li>
            <li><a href="/category/travel" className="hover:underline">Travel</a></li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">Popular Posts</h2>
          <ul>
            <li><a href="/post/2" className="hover:underline">Popular Post 1</a></li>
            <li><a href="/post/3" className="hover:underline">Popular Post 2</a></li>
            <li><a href="/post/4" className="hover:underline">Popular Post 3</a></li>
          </ul>
        </aside>
      </main>
      <footer className="flex justify-center items-center py-4">
        <p>&copy; 2023 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
