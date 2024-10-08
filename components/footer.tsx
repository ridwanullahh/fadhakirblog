
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Fadhakir Blog. All rights reserved.</p>
        <nav className="mt-4">
          <Link href="/about" className="mx-2">About</Link>
          <Link href="/contact" className="mx-2">Contact</Link>
          <Link href="/privacy" className="mx-2">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
