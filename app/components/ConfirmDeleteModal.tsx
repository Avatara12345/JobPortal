import React from 'react'

interface ConfirmDeleteModalProps {
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export default function ConfirmDeleteModal({
  onClose,
  onConfirm,
  isDeleting
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
        <p className="text-sm text-gray-600 mt-2">Do you really want to delete this job? This action cannot be undone.</p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
