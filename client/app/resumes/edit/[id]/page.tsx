"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

type ResumeForm = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  skills: string;
  category: string;
  experience: string;
  currentCompany: string;
  expectedSalary: string;
  status: string;
  notes: string;
};

export default function EditResumePage() {
  useAuth();

  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState<ResumeForm>({
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

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resumes/${id}`);
      const data = res.data;

      setForm({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        countryCode: data.countryCode || "+91",
        skills: data.skills?.join(", ") || "",
        category: data.category || "",
        experience: data.experience?.toString() || "",
        currentCompany: data.currentCompany || "",
        expectedSalary: data.expectedSalary?.toString() || "",
        status: data.status || "",
        notes: data.notes || "",
      });
    } catch (error: any) {
      console.log("Error:", error?.response?.data || error);
      alert("Failed to load resume");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) fetchResume();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED")

    try {
      setLoading(true);

      const payload = {
        ...form,
        experience: Number(form.experience),
        expectedSalary: Number(form.expectedSalary),
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      console.log("PAYLOAD:", payload);

      await api.put(`/resumes/${id}`, payload);

      alert("Resume updated successfully");
      router.push("/resumes");
    } catch (error: any) {
      console.log("UPDATE ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading resume...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Edit Resume</h1>
        </div>

        {/* Personal Info */}
        <div className="border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Personal Information
          </h2>

          <div className="grid gap-4">
            <input
              value={form.fullName}
              name="fullName"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Full Name"
            />

            <input
              value={form.email}
              name="email"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Email"
            />

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>

              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  aria-label="Country Code"
                  className="border rounded px-3 py-2 bg-white text-sm"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>

                <input
                  value={form.phone}
                  name="phone"
                  onChange={handleChange}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional */}
        <div className="border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Professional Details
          </h2>

          <div className="grid gap-4">
            <input
              value={form.skills}
              name="skills"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Skills (React, Node, Mongo)"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              aria-label="Category"
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>

            <input
              value={form.experience}
              name="experience"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Experience (years)"
            />

            <input
              value={form.currentCompany}
              name="currentCompany"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Current Company"
            />

            <input
              value={form.expectedSalary}
              name="expectedSalary"
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Expected Salary (INR)"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              aria-label="Status"
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Called">Called</option>
            </select>

            <textarea
              value={form.notes}
              name="notes"
              onChange={handleChange}
              rows={3}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Notes"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold transition"
        >
          {loading ? "Updating..." : "Update Resume"}
        </button>
      </form>
    </div>
  );
}