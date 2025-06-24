"use client";
import { useDebounce } from "use-debounce";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "../../utils/auth";
import { toast } from "react-hot-toast";
import CreateJobForm from "../../components/CreateJobForm";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import SearchBar from "../../components/SearchBar";
import { StatsCard } from "../../components/StatsCard";
import { Pagination } from "../../components/Pagination";
import { JobTable } from "../../components/JobTable";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const [state, setState] = useState({
    jobs: [] as Job[],
    loading: true,
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    showCreateForm: false,
    editingJob: null as Job | null,
    selectedJobId: null as number | null,
    isDeleting: false,
  });

  const fetchJobs = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const token = localStorage.getItem("token") || "";

      const res = await fetch(
        `https://job-portal-rp7w.onrender.com/api/jobs/alljobs?search=${debouncedSearchTerm}&page=${state.currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      if (!data.jobs) throw new Error("Invalid data format");

      setState((prev) => ({
        ...prev,
        jobs: data.jobs,
        totalJobs: data.totolJobs,
        totalPages: Math.ceil(data.totolJobs / 10),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to load jobs");
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.currentPage, debouncedSearchTerm]);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user || user.role !== "admin") router.push("/login");
    else fetchJobs();
  }, [state.currentPage, debouncedSearchTerm, fetchJobs, router]);

  const handleAction = {
    pageChange: (newPage: number) => {
      if (newPage >= 1 && newPage <= state.totalPages) {
        setState((prev) => ({ ...prev, currentPage: newPage }));
      }
    },
    editJob: (job: Job) => {
      setState((prev) => ({ ...prev, editingJob: job, showCreateForm: true }));
    },
    deleteJob: (id: number) => {
      setState((prev) => ({ ...prev, selectedJobId: id }));
    },
    confirmDelete: async () => {
      if (!state.selectedJobId) return;
      setState((prev) => ({ ...prev, isDeleting: true }));
      try {
        const token = localStorage.getItem("token") || "";
        const res = await fetch(
          `https://job-portal-rp7w.onrender.com/api/jobs/job/${state.selectedJobId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to delete job");
        toast.success("Job deleted successfully!");
        fetchJobs();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete job");
      } finally {
        setState((prev) => ({
          ...prev,
          isDeleting: false,
          selectedJobId: null,
        }));
      }
    },
    jobSuccess: () => {
      setState((prev) => ({
        ...prev,
        showCreateForm: false,
        editingJob: null,
      }));
      fetchJobs();
    },
  };

  if (state.loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
        <p className="text-gray-500 mt-2">Manage all job postings in one place</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={(e) => e.preventDefault()} />
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, showCreateForm: true, editingJob: null }))
          }
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Jobs" value={state.totalJobs} bg="bg-indigo-100" text="text-indigo-800" />
        <StatsCard title="Current Page" value={`${state.currentPage}/${state.totalPages}`} bg="bg-blue-100" text="text-blue-800" />
        <StatsCard title="Showing" value={state.jobs.length} bg="bg-green-100" text="text-green-800" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <JobTable jobs={state.jobs} onEdit={handleAction.editJob} onDelete={handleAction.deleteJob} />
      </div>

      {state.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(state.currentPage - 1) * 10 + 1}</span> to
            <span className="font-medium"> {Math.min(state.currentPage * 10, state.totalJobs)}</span> of
            <span className="font-medium"> {state.totalJobs}</span> jobs
          </div>
          <Pagination currentPage={state.currentPage} totalPages={state.totalPages} onPageChange={handleAction.pageChange} />
        </div>
      )}

      {state.showCreateForm && (
        <CreateJobForm
          onClose={() => setState((prev) => ({ ...prev, showCreateForm: false }))}
          onSuccess={handleAction.jobSuccess}
          initialData={state.editingJob ? { ...state.editingJob, id: String(state.editingJob.id) } : null}
        />
      )}

      {state.selectedJobId && (
        <ConfirmDeleteModal
          onClose={() => setState((prev) => ({ ...prev, selectedJobId: null }))}
          onConfirm={handleAction.confirmDelete}
          isDeleting={state.isDeleting}
        />
      )}
    </div>
  );
}
