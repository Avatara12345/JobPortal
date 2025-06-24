// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import api from "../lib/axios";
// import { useAuth } from "../context/AuthContext";

// export default function ApplyJobClient({ jobId }: { jobId: string }) {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [resumeUrl, setResumeUrl] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error("Please login to apply for jobs");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await api.post(
//         "/job/application",
//         {
//           job_id: jobId,
//           resume_url: resumeUrl,
//           cover_letter: coverLetter,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success("Application submitted successfully!");
//       router.push("/user-dashboard/appliedJobs");
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         toast.error(
//           err.response?.data?.message || "Failed to submit application"
//         );
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Apply for Job ID: {jobId}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
//               Resume URL
//             </label>
//             <input
//               type="text"
//               id="resumeUrl"
//               value={resumeUrl}
//               onChange={(e) => setResumeUrl(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="https://drive.google.com/your-resume"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
//               Cover Letter
//             </label>
//             <textarea
//               id="coverLetter"
//               rows={6}
//               value={coverLetter}
//               onChange={(e) => setCoverLetter(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Explain why you're a good fit..."
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
