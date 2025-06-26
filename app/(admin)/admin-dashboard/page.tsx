"use client";

import { useDebounce } from "use-debounce";
import { useState, useCallback, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [modalState, setModalState] = useState({
    showCreateForm: false,
    editingJob: null as Job | null,
    selectedJobId: null as number | null,
    isDeleting: false,
  });

  const jobsPerPage = 10;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";

      const res = await fetch(
        `https://job-portal-rp7w.onrender.com/api/jobs/alljobs?search=${debouncedSearchTerm}&page=${currentPage}&limit=${jobsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      if (!data.jobs) throw new Error("Invalid response structure");

      setJobs(data.jobs);
      setTotalJobs(data.totolJobs); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleEdit = (job: Job) => {
    setModalState({
      ...modalState,
      showCreateForm: true,
      editingJob: job,
    });
  };

  const handleDelete = (id: number) => {
    setModalState({ ...modalState, selectedJobId: id });
  };

  const handleConfirmDelete = async () => {
    if (!modalState.selectedJobId) return;

    setModalState((prev) => ({ ...prev, isDeleting: true }));
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `https://job-portal-rp7w.onrender.com/api/jobs/job/${modalState.selectedJobId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    } finally {
      setModalState({
        showCreateForm: false,
        editingJob: null,
        selectedJobId: null,
        isDeleting: false,
      });
    }
  };

  const handleSuccess = () => {
    setModalState({
      showCreateForm: false,
      editingJob: null,
      selectedJobId: null,
      isDeleting: false,
    });
    fetchJobs();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-indigo-600 mx-auto" />
          <p className="text-gray-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
        <p className="text-gray-500 mt-2">Manage all job postings in one place</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            fetchJobs();
          }}
        />
        <button
          onClick={() =>
            setModalState((prev) => ({
              ...prev,
              showCreateForm: true,
              editingJob: null,
            }))
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Create Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Jobs" value={totalJobs} bg="bg-indigo-100" text="text-indigo-800" />
        <StatsCard title="Page" value={`${currentPage}/${totalPages}`} bg="bg-blue-100" text="text-blue-800" />
        <StatsCard title="Results" value={jobs.length} bg="bg-green-100" text="text-green-800" />
      </div>

      {/* Job Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <JobTable jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * jobsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * jobsPerPage, totalJobs)}</span> of{" "}
            <span className="font-medium">{totalJobs}</span> jobs
          </p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalState.showCreateForm && (
        <CreateJobForm
          onClose={() => setModalState((prev) => ({ ...prev, showCreateForm: false }))}
          onSuccess={handleSuccess}
          initialData={
            modalState.editingJob ? { ...modalState.editingJob, id: String(modalState.editingJob.id) } : null
          }
        />
      )}
      {/* Delete Confirmation */}
      {modalState.selectedJobId && (
        <ConfirmDeleteModal
          onClose={() => setModalState((prev) => ({ ...prev, selectedJobId: null }))}
          onConfirm={handleConfirmDelete}
          isDeleting={modalState.isDeleting}
        />
      )}
    </div>
  );
}
