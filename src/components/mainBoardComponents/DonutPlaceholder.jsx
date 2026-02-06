function DonutPlaceholder({ title }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-72">
      <p className="text-sm text-gray-700 mb-2">{title}</p>
      <div className="h-full flex items-center justify-center text-gray-400">
        Donut Chart Placeholder
      </div>
    </div>
  );
}
export default DonutPlaceholder;
