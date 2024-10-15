export default function Stats() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Users</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Branches</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">567</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Users</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">35</p>
        </div>
      </div>
    );
  }
  