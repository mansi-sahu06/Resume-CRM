import api from "@/lib/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/resumes/stats");
  return response.data;
};

export const updateStatus = async (id: string, status: string) => {
  const res = await api.patch(`/resumes/${id}/status`, { status });
  return res.data;
};

export const getRecentResumes = async () => {
  const res = await api.get("/resumes/recent");
  return res.data;
};