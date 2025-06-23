// function StatusBadge({ status }: { status: string }) {
//   const statusColors = {
//     Applied: 'bg-blue-100 text-blue-800',
//     Reviewed: 'bg-yellow-100 text-yellow-800',
//     Interview: 'bg-purple-100 text-purple-800',
//     Offered: 'bg-green-100 text-green-800',
//     Rejected: 'bg-red-100 text-red-800',
//   };

//   const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
//       {status || 'Applied'}
//     </span>
//   );
// }