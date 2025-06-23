// components/AppliedJobs.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import { getUserFromLocalStorage } from "@/app/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

type AppliedJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  status?: string;
  // applicationDate?: string;
};

export default function AppliedJobs() {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // 🛡️ Route protection
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user || (user.role !== "user" && user.role !== "admin")) {
      router.push("/login");
    }
  }, [router]);

  // 📦 Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/job/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Your Applications
          </h2>
          <p className="text-gray-500 mt-1">
            Track the status of your job applications
          </p>
        </div>
        <Link
          href="/jobs"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Find More Jobs
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4 text-lg">
            You haven’t applied to any jobs yet.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Apply Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-indigo-600 font-medium">{job.company}</p>
                  <p className="text-gray-500">{job.location}</p>
                </div>
                <span className="px-4 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {job.status || "Applied"}
                </span>
              </div>

              {/* Optional: Show date
              <div className="mt-3 text-sm text-gray-500">
                Applied on: {new Date(job.applicationDate!).toLocaleDateString()}
              </div> 
              */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
