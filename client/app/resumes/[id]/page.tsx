"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function ResumeDetailsPage() {
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resumes/${id}`);
      console.log("API Response:", res.data);
      console.log("Resume URL:", res.data.resumeUrl);
      setResume(res.data.resume || res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load resume");
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  if (!resume)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading candidate...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl rounded-2xl p-8 mb-6">
        <h1 className="text-3xl font-bold">{resume.fullName}</h1>
        <p className="opacity-90">{resume.category}</p>

        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href={`http://localhost:5000/${resume.resumeFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">
            Contact Information
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {resume.email || "-"}
            </p>
            <p>
              <strong>Phone:</strong> {resume.phone || "-"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {resume.location || "Not specified"}
            </p>
          </div>
        </div>

        {/* Professional */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">
            Professional Details
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Experience:</strong> {resume.experience || 0} years
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {resume.status}
              </span>
            </p>
            <p>
              <strong>Current Company:</strong>{" "}
              {resume.currentCompany || "-"}
            </p>
            <p>
              <strong>Expected Salary:</strong>{" "}
              {resume.expectedSalary || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {resume.skills?.length > 0 ? (
            resume.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No skills added</p>
          )}
        </div>
      </div>

      {/* Notes */}
      {resume.notes && (
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h2 className="font-semibold text-gray-800 mb-3">
            Recruiter Notes
          </h2>
          <p className="text-gray-600">{resume.notes}</p>
        </div>
      )}
    </div>
  );
}