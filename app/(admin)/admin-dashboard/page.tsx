"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "../../utils/auth";
import { toast } from "react-hot-toast";
import CreateJobForm from "@/app/components/CreateJobForm";
import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useCallback } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary_range: number;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [state, setState] = useState({
    jobs: [] as Job[],
    loading: true,
    searchTerm: "",
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    showCreateForm: false,
    editingJob: null as Job | null,
    selectedJobId: null as number | null,
    isDeleting: false
  });


  const fetchJobs = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const token = localStorage.getItem("token") || "";
  
      const res = await fetch(
        `https://job-portal-rp7w.onrender.com/api/jobs/alljobs?search=${state.searchTerm}&page=${state.currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!res.ok) throw new Error("Failed to fetch jobs");
  
      const data = await res.json();
      if (!data.jobs) throw new Error("Invalid data format");
  
      setState(prev => ({
        ...prev,
        jobs: data.jobs,
        totalJobs: data.totolJobs,
        totalPages: Math.ceil(data.totolJobs / 10),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to load jobs");
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [state.currentPage, state.searchTerm]);
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user || user.role !== "admin") router.push("/login");
    else fetchJobs();
  }, [state.currentPage, state.searchTerm, fetchJobs, router]);

  const handleAction = {
    search: (e: React.FormEvent) => {
      e.preventDefault();
      setState(prev => ({...prev, currentPage: 1}));
    },
    pageChange: (newPage: number) => {
      if (newPage >= 1 && newPage <= state.totalPages) {
        setState(prev => ({...prev, currentPage: newPage}));
      }
    },
    editJob: (job: Job) => {
      setState(prev => ({...prev, editingJob: job, showCreateForm: true}));
    },
    deleteJob: (id: number) => {
      setState(prev => ({...prev, selectedJobId: id}));
    },
    confirmDelete: async () => {
      if (!state.selectedJobId) return;
      
      setState(prev => ({...prev, isDeleting: true}));
      try {
        const token = localStorage.getItem("token") || "";
        const res = await fetch(
          `https://job-portal-rp7w.onrender.com/api/jobs/job/${state.selectedJobId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!res.ok) throw new Error("Failed to delete job");
        toast.success("Job deleted successfully!");
        fetchJobs();
      } catch (error) {
        console.log(error)
        toast.error("Failed to delete job");
      } finally {
        setState(prev => ({...prev, isDeleting: false, selectedJobId: null}));
      }
    },
    jobSuccess: () => {
      setState(prev => ({...prev, showCreateForm: false, editingJob: null}));
      fetchJobs();
    }
  };

  if (state.loading) return (
    <div className="grid place-items-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="text-gray-600 font-medium">Loading jobs...</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto  py-4 max-w-7xl">
 
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
        <p className="text-gray-500 mt-2">Manage all job postings in one place</p>
      </div>


      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <form onSubmit={handleAction.search} className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs by title, company or location..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={state.searchTerm}
            onChange={(e) => setState(prev => ({...prev, searchTerm: e.target.value}))}
          />
        </form>
        <button 
          onClick={() => setState(prev => ({...prev, showCreateForm: true, editingJob: null}))}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus /> Create Job
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Total Jobs", value: state.totalJobs, bg: "bg-indigo-100", text: "text-indigo-800" },
          { title: "Current Page", value: `${state.currentPage}/${state.totalPages}`, bg: "bg-blue-100", text: "text-blue-800" },
          { title: "Showing", value: state.jobs.length, bg: "bg-green-100", text: "text-green-800" }
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} ${stat.text} p-4 rounded-lg shadow-sm`}>
            <h3 className="text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Company", "Location", "Salary", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {state.jobs.length > 0 ? (
                state.jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ₹{job.salary_range.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleAction.editJob(job)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          onClick={() => handleAction.deleteJob(job.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {state.searchTerm ? "No jobs match your search criteria" : "No jobs available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {state.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(state.currentPage - 1) * 10 + 1}</span> to{" "}
            <span className="font-medium">{Math.min(state.currentPage * 10, state.totalJobs)}</span> of{" "}
            <span className="font-medium">{state.totalJobs}</span> jobs
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAction.pageChange(1)}
              disabled={state.currentPage === 1}
              className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="First page"
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={() => handleAction.pageChange(state.currentPage - 1)}
              disabled={state.currentPage === 1}
              className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Previous page"
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: Math.min(5, state.totalPages) }, (_, i) => {
              let pageNum;
              if (state.totalPages <= 5) pageNum = i + 1;
              else if (state.currentPage <= 3) pageNum = i + 1;
              else if (state.currentPage >= state.totalPages - 2) pageNum = state.totalPages - 4 + i;
              else pageNum = state.currentPage - 2 + i;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handleAction.pageChange(pageNum)}
                  className={`w-10 h-10 rounded-md ${
                    state.currentPage === pageNum 
                      ? "bg-indigo-600 text-white" 
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handleAction.pageChange(state.currentPage + 1)}
              disabled={state.currentPage === state.totalPages}
              className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Next page"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => handleAction.pageChange(state.totalPages)}
              disabled={state.currentPage === state.totalPages}
              className="p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Last page"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {state.showCreateForm && (
        <CreateJobForm
          onClose={() => setState(prev => ({...prev, showCreateForm: false}))}
          onSuccess={handleAction.jobSuccess}
          initialData={state.editingJob}
        />
      )}

      {state.selectedJobId && (
        <ConfirmDeleteModal
          onClose={() => setState(prev => ({...prev, selectedJobId: null}))}
          onConfirm={handleAction.confirmDelete}
          isDeleting={state.isDeleting}
        />
      )}
    </div>
  );
}