"use client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import {toast, Toaster } from 'react-hot-toast'
import "react-toastify/dist/ReactToastify.css";
import { getUserFromLocalStorage } from "@/app/utils/auth";
import api from "@/app/lib/axios";
import Loading from "@/app/components/Loading";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
  });
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(
    null
  );
  const [Id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
    const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (!user || !user.id) {
      toast.error("User not found. Please login again.");
      router.push("/login");
      return;
    }

    setId(user.id); // ✅ Now ID will be properly set

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(`/auth/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          resume: userData.resume || "",
        });

        if (userData.resume) {
          const resumeUrl = `https://job-portal-rp7w.onrender.com/${userData.resume}`;
          setResumePreviewUrl(resumeUrl);
        }
      } catch (err) {
        setError("Failed to load profile data. Please refresh the page.");
      }
    };

    fetchUserData();
  },[]);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user || (user.role !== "user" && user.role !== "admin")) {
      router.push("/login");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "resume") {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedResumeFile(file);
        setFormData((prev) => ({
          ...prev,
          resume: file.name,
        }));

        const fileUrl = URL.createObjectURL(file);
        setResumePreviewUrl(fileUrl);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleRemoveResume = () => {
    setSelectedResumeFile(null);
    setFormData((prev) => ({ ...prev, resume: "" }));
    // setResumePreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token || !Id) {
        router.push("/login");
        return;
      }
      console.log(Id);
      const form = new FormData();
      form.append("name", formData.name);
      if (selectedResumeFile) {
        form.append("resume", selectedResumeFile);
      }
      const res = await api.put(`/auth/updateprofile/${Id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("when i put a data", res);

      toast.success("Profile updated successfully!");

      setTimeout(() => {
        router.push("/user-dashboard");
      }, 2500);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Toaster position="top-right" />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume/CV
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("resume-upload")?.click()
                }
                className="inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                +
              </button>

              {formData.resume ? (
                <a
                  href={`https://job-portal-rp7w.onrender.com${formData.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                  {formData.resume}
                </a>
              ) : (
                <span className="text-gray-700 text-sm">No file selected</span>
              )}
            </div>

            <input
              id="resume-upload"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="hidden"
            />
            {formData.resume && (
              <button
                type="button"
                onClick={handleRemoveResume}
                className="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove Resume
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition flex justify-center items-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
