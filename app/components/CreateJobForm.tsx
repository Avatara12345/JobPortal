
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    salary_range: z.string()
      .min(1, "Salary is required")
      .refine(val => !isNaN(Number(val)), {
        message: "Salary must be a number"
      })
      .transform(val => Number(val))
  });
  
  interface CreateJobFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: {
      id?: string;
      title: string;
      description: string;
      company: string;
      location: string;
      salary_range: number;
    } | null;
  }
  
  export default function CreateJobForm({
    onClose,
    onSuccess,
    initialData,
  }: CreateJobFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      company: "",
      location: "",
      salary_range: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          description: initialData.description || '',
          company: initialData.company || '',
          location: initialData.location || '',
          salary_range: initialData.salary_range?.toString() || ''
        });
      }
    }, [initialData]);
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };
  
    // const validateForm = () => {
    //   try {
    //     // Parse and validate the form data
    //     jobSchema.parse(formData);
    //     setErrors({});
    //     return true;
    //   } catch (error) {
    //     if (error instanceof z.ZodError) {
    //       const newErrors: Record<string, string> = {};
    //       error.errors.forEach((err) => {
    //         if (err.path.length > 0) {
    //           newErrors[err.path[0]] = err.message;
    //         }
    //       });
    //       setErrors(newErrors);
    //     }
    //     return false;
    //   }
    // };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // First validate the form
      const validationResult = jobSchema.safeParse(formData);
      if (!validationResult.success) {
        const newErrors: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the form errors");
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");
        const validatedData = validationResult.data; 
        if (initialData?.id) {
     
          await api.put(
            `/jobs/updatejob/${initialData.id}`,
            validatedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Job updated successfully!");
        } else {
          // Create new job
          await api.post(
            "/jobs/createjob",
            validatedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          
          toast.success("Job created successfully!");
          setFormData({
            title: "",
            description: "",
            company: "",
            location: "",
            salary_range: "",
          });
        }
        
        onSuccess();
        onClose();
        router.refresh();
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to process job";
          
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {initialData?.id ? "Edit Job" : "Create New Job"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company*
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range*
              </label>
              <input
                type="text"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.salary_range ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. 50000-70000"
              />
              {errors.salary_range && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.salary_range}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-white ${
                  isSubmitting
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    {initialData?.id ? "Updating..." : "Creating..."}
                  </span>
                ) : initialData?.id ? (
                  "Update Job"
                ) : (
                  "Create Job"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
