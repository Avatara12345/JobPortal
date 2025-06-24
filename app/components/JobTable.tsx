
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary_range: number;
  description: string;
}

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

export const JobTable = ({ jobs, onEdit, onDelete }: JobTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {["Title", "Company", "Location", "Salary", "Actions"].map(
              (head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {job.title}
                </td>
                <td className="px-6 py-4 text-gray-500">{job.company}</td>
                <td className="px-6 py-4 text-gray-500">{job.location}</td>
                <td className="px-6 py-4 text-gray-500">
                  ₹{job.salary_range.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(job)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
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
              <td
                colSpan={5}
                className="px-6 py-8 text-center text-gray-500"
              >
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
