"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-600 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Resume CRM</h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-gray-300">
          Dashboard
        </Link>

        <Link href="/resumes/add" className="block hover:text-gray-300">
          Add Resume
        </Link>

        <Link href="/resumes" className="block hover:text-gray-300">
          All Resumes
        </Link>

        <button
          onClick={logout}
          className="mt-10 text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
