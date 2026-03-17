"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import StatCard from "@/components/statCard";
import { getDashboardStats } from "@/services/resumeServices";

export default function DashboardPage() {
  useAuth();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Track hiring progress and candidate insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="hover:shadow-2xl"><StatCard title="Total Resumes" value={stats.totalResumes} /></div>
        <div className="hover:shadow-2xl"><StatCard title="Full Stack" value={stats.fullStack} /></div>
        <div className="hover:shadow-2xl"><StatCard title="Digital Marketing" value={stats.digitalMarketing} /></div>
        <div className="hover:shadow-2xl"><StatCard title="Cyber Security" value={stats.cyberSecurity} /></div>
        <div className="hover:shadow-2xl"><StatCard title="Shortlisted" value={stats.shortlisted} /></div>
      </div>

      {/* Hiring Pipeline */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Hiring Pipeline</h2>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 rounded bg-blue-100 text-blue-700">
            New
          </div>
          <div className="px-4 py-2 rounded bg-yellow-100 text-yellow-700">
            Shortlisted
          </div>
          <div className="px-4 py-2 rounded bg-purple-100 text-purple-700">
            Interview
          </div>
          <div className="px-4 py-2 rounded bg-green-100 text-green-700">
            Selected
          </div>
          <div className="px-4 py-2 rounded bg-red-100 text-red-700">
            Rejected
          </div>
        </div>
      </div>
    </div>
  );
}