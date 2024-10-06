
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <nav>
            <Link href="/admin">
              <a className="mr-4">Dashboard</a>
            </Link>
            <Link href="/admin/posts">
              <a>Posts</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center">
        &copy; 2023 Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLayout;
