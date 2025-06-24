"use client";
		import { useState } from "react";
		import { useRouter, useParams } from "next/navigation";
		import api from "../../../../lib/axios";
		import { toast } from "react-hot-toast";
		import { useAuth } from "../../../../context/AuthContext";
		import axios from "axios";

		export default function ApplyJobPage() {
		  const { id } = useParams();
		  
		  const router = useRouter();
		  const { user } = useAuth();
		  const [resumeUrl, setResumeUrl] = useState("");
		  const [coverLetter, setCoverLetter] = useState("");
		  const [loading, setLoading] = useState(false);

		  console.log("Rendering ApplyJobPage");
		console.log("Params:", useParams());

		  const handleSubmit = async (e: React.FormEvent) => {
		    e.preventDefault();
		  
		    if (!user) {
		      toast.error("Please login to apply for jobs");
		      return;
		    }
		  
		    setLoading(true);
		    try {
		      const token = localStorage.getItem("token");
		      await api.post(
			"/job/application",
			{
			  job_id:id,
			  resume_url: resumeUrl,
			  cover_letter: coverLetter,
			},
			{
			  headers: {
			    Authorization: `Bearer ${token}`,
			    "Content-Type": "application/json",
			  },
			}
		      );
		      toast.success("Application submitted successfully!");
		      router.push("/user-dashboard/appliedJobs");
		    } catch (err: unknown) {
		      if (axios.isAxiosError(err)) {
			toast.error(
			  err.response?.data?.message || "Failed to submit application"
			);
		      } else {
			toast.error("An unexpected error occurred");
		      }
		    } finally {
		      setLoading(false);
		    }
		  };

		  return (
		    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Apply for Job</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
			  <div>
			    <label
			      htmlFor="resumeUrl"
			      className="block text-sm font-medium text-gray-700"
			    >
			      Resume URL
			    </label>
			    <input
			      type="file"
			      id="resumeUrl"
			      value={resumeUrl}
			      onChange={(e) => setResumeUrl(e.target.value)}
			      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
			      placeholder="https://example.com/your-resume.pdf"
			      required
			    />
			    <p className="mt-1 text-sm text-gray-500">
			      Upload your resume to a service like Google Drive and paste the
			      shareable link here
			    </p>
			  </div>

			  <div>
			    <label
			      htmlFor="coverLetter"
			      className="block text-sm font-medium text-gray-700"
			    >
			      Cover Letter
			    </label>
			    <textarea
			      id="coverLetter"
			      rows={6}
			      value={coverLetter}
			      onChange={(e) => setCoverLetter(e.target.value)}
			      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
			      placeholder="Explain why you're a good fit for this position..."
			      required
			    />
			  </div>

			  <div className="flex justify-end space-x-3">
			    <button
			      type="button"
			      onClick={() => router.back()}
			      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			    >
			      Cancel
			    </button>
			    <button
			      type="submit"
			      disabled={loading}
			      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
			    >
			      {loading ? "Submitting..." : "Submit Application"}
			    </button>
			  </div>
			</form>
		      </div>
		    </div>
		  );
		}

		   