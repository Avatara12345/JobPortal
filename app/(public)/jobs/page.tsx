"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { notFound } from 'next/navigation';

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary_range: number;
  company: string;
  created_at: string;
}

interface ApiResponse {
  jobs: Job[];
  totolJobs: number;
  currentPage: string;
  limit: string;
}

export default function JobsPage() {
  const { user } = useAuth();
 
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 10;

    useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<ApiResponse>(
        `/jobs/alljobs?search=${debouncedSearchTerm}&page=${currentPage}&limit=${jobsPerPage}`
      );
      
      setJobs(res.data.jobs);
      setTotalJobs(res.data.totolJobs);
      setTotalPages(Math.ceil(res.data.totolJobs / jobsPerPage));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } else {
        setError("Failed to fetch jobs");
      }
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, jobsPerPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }
  
  if(!jobs) return notFound();
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Career Opportunities</h1>
          <p className="text-gray-500 mt-4">Find your dream job with top companies</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </form>

        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                  <p className="text-indigo-600 text-sm font-medium">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  ₹{job.salary_range.toLocaleString()}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{job.description}</p>
              </div>

              {user?.role === "user" && (
                <div className="mt-6 text-right">
                  <Link
                        href={`/jobs/apply/${job.id}`}
                        className="inline-block bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Apply Now
                    </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * jobsPerPage + 1} to{" "}
              {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs} jobs
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                «
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ‹
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum ? "bg-indigo-500 text-white" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ›
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}