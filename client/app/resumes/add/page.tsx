"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AddResumePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    skills: "",
    category: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",
    status: "",
    notes: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", `${form.countryCode}${form.phone}`);
      formData.append("category", form.category);
      formData.append("experience", String(Number(form.experience)));
      formData.append("currentCompany", form.currentCompany);
      formData.append("expectedSalary", String(Number(form.expectedSalary)));
      formData.append("status", form.status);
      formData.append("notes", form.notes);

      // Skills
      form.skills.split(",").forEach((skill: string) => {
        if (skill.trim()) {
          formData.append("skills", skill.trim());
        }
      });

      formData.append("resume", file);

      await api.post("/resumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resume added successfully");
      router.push("/resumes");
    } catch (error: any) {
      console.log("ADD ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Error uploading resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-xl space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Add Resume
          </h1>
          <p className="text-gray-500 mt-2">
            Streamline hiring and manage candidates efficiently
          </p>
        </div>

        {/* PERSONAL */}
        <div className="bg-gray-50 p-6 rounded-xl border space-y-4 grid gap-4">
          <h2 className="font-semibold text-blue-600 text-lg">
            Personal Information
          </h2>

          {/* Full name */}
          <input
            name="fullName"
            placeholder="Full Name"
            className="input-style border rounded p-2"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="input-style border rounded p-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Phone Number
            </label>

            <div className="flex border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <select
                name="countryCode"
                className="bg-gray-100 px-3 outline-none"
                onChange={handleChange}
                aria-label="Select country code"
                value={form.countryCode}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+61">🇦🇺 +61</option>
              </select>

              <input
                name="phone"
                placeholder="Enter phone number"
                className="flex-1 p-3 outline-none"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* PROFESSIONAL */}
        <div className="bg-gray-50 p-6 rounded-xl border space-y-4 grid gap-4">
          <h2 className="font-semibold text-blue-600 text-lg">
            Professional Details
          </h2>

          <input
            name="skills"
            placeholder="Skills (React, Node, Mongo)"
            className="input-style border rounded p-2"
            value={form.skills}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Category
            </label>

            <select
              name="category"
              className="input-style bg-white border rounded p-2"
              value={form.category}
              aria-label="Select category"
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Full Stack Development</option>
              <option>Cyber Security</option>
              <option>Digital Marketing</option>
            </select>
          </div>

          <input
            name="experience"
            placeholder="Experience (years)"
            className="input-style border rounded p-2"
            value={form.experience}
            onChange={handleChange}
          />

          <input
            name="currentCompany"
            placeholder="Current Company"
            className="input-style border rounded p-2"
            value={form.currentCompany}
            onChange={handleChange}
          />

          <input
            name="expectedSalary"
            placeholder="Expected Salary"
            className="input-style border rounded p-2"
            value={form.expectedSalary}
            onChange={handleChange}
          />
        </div>

        {/* UPLOAD */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <h2 className="font-semibold text-blue-600 text-lg mb-3">
            Resume Upload
          </h2>

          <label
            htmlFor="resume"
            className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5.5 5.5 0 0117.5 9H18a4 4 0 010 8h-3m-3-4v6m0 0l-3-3m3 3l3-3"
              />
            </svg>

            <p className="text-gray-700 font-medium">
              Click or drag resume to upload
            </p>

            <p className="text-xs text-gray-400">
              PDF only • Max size 5MB
            </p>

            {file && (
              <p className="mt-2 text-green-600 font-semibold">
                {file.name}
              </p>
            )}

            <input
              id="resume"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white p-3 rounded-xl font-semibold transition shadow-md"
        >
          {loading ? "Uploading..." : "Save Resume"}
        </button>
      </form>
    </div>
  );
}