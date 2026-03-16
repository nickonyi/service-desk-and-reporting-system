export const tableHeaders = [
  'id',
  'Title',
  'Category',
  'location',
  'Status',
  'Assigned',
  'Created',
  'State',
];

export const getStatusColors = (status = '') => {
  switch (status.toLowerCase()) {
    case 'open':
      return 'text-green-800';
    case 'in progress':
      return 'text-yellow-800';
    case 'awaiting user':
      return 'text-emerald-700';
    case 'awaiting vendor':
      return 'text-cyan-700';
    case 'closed':
      return 'text-gray-500';
    default:
      return 'text-gray-600';
  }
};
