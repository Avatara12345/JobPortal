
// "use client";

// import { useState, useEffect } from "react";
// import api from "../../../lib/axios";
// import { toast } from "react-hot-toast";
// import useAuth from "../../../components/auth/useAuth";

// interface Application {
//   id: string;
//   job: {
//     id: string;
//     title: string;
//     company: string;
//   };
//   status: string;
//   appliedAt: string;
// }

// export default function MyApplicationsPage() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user) return;

//     const fetchApplications = async () => {
//       try {
//         const res = await api.get("/job/me");
//         setApplications(res.data);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch applications");
//         toast.error("Failed to fetch applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600">Please login to view your applications</p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your applications...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">My Job Applications</h1>
        
//         {error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : applications.length === 0 ? (
//           <div className="text-center text-gray-500">
//             You have not applied to any jobs yet.
//           </div>
//         ) : (
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <ul className="divide-y divide-gray-200">
//               {applications.map((app) => (
//                 <li key={app.id}>
//                   <div className="px-4 py-5 sm:px-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-lg leading-6 font-medium text-gray-900">
//                           {app.job.title}
//                         </h3> 
//                         <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                           {app.job.company}
//                         </p>
//                       </div>
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           app.status === "pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : app.status === "accepted"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                       </span>
//                     </div>
//                     <div className="mt-4">
//                       <p className="text-sm text-gray-500">
//                         Applied on {new Date(app.appliedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }