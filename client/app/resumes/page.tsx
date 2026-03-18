"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

export default function ResumesPage() {
  useAuth();

  const [resumes, setResumes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const fetchResumes = async () => {
    const params: any = {};

    if (search) params.search = search;
    if (category) params.category = category;
    if (status) params.status = status;

    const res = await api.get("/resumes", { params });
    setResumes(res.data.resumes);
  };

  useEffect(() => {
    fetchResumes();
  }, [search, category, status]);

  const handleEdit = (id: string) => {
    if (!confirm("Edit this resume?")) return;
    window.location.href = `/resumes/edit/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume?")) return;

    try {
      await api.delete(`/resumes/${id}`);
      fetchResumes();
    } catch {
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.put(`/resumes/${id}`, { status });
      fetchResumes();
    } catch {
      alert("Status update failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl flex items-center justify-center font-bold  text-white">
          All Resumes
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Search candidate..."
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg focus:ring-2 text-black focus:ring-blue-500 outline-none"
            value={category}
            aria-label="Filter by category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Full Stack Development</option>
            <option>Cyber Security</option>
            <option>Digital Marketing</option>
          </select>

          <select
            className="border p-2 rounded-lg  text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={status}
            aria-label="Filter by status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
              <th className="p-4">Current Company</th>
              <th className="p-4">Expected Salary</th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((r) => (
              <tr key={r._id} className="border-t hover:bg-gray-50 text-black" >
                <td className="p-4 font-medium">{r.fullName}</td>
                <td className="p-4">{r.category}</td>
                <td className="p-4">{r.experience} yrs</td>

                {/* Status */}
                <td className="p-4">
                  <select 
                    name="status"
                    value={r.status}
                    aria-label="Update candidate status"
                    onChange={(e) =>
                      handleStatusChange(r._id, e.target.value)
                    }
                    className="flex border px-3 py-1 rounded-md focus:ring-2 focus:ring-blue-500  "
                  >
                    <option>New</option>
                    <option>Shortlisted</option>
                    <option>Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                  <Link href={`/resumes/${r._id}`} className="text-blue-600">
                    View
                  </Link>

                  <button
                    onClick={() => handleEdit(r._id)}
                    className="text-green-600 flex hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  </div>
                </td>
                 <td className="p-4">{r.currentCompany}</td>
                  <td className="p-4">{r.expectedSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}