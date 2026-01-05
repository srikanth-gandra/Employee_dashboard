import { useEmployee } from "../context/EmployeeContext";

const DEFAULT_IMAGE =
  "https://www.w3schools.com/howto/img_avatar.png";

export default function EmployeeTable({ filteredEmployees }) {
  const { deleteEmployee, updateEmployee, setEditingEmployee } =
    useEmployee();

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      deleteEmployee(id);
    }
  };

  const employees = filteredEmployees;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white px-4 py-2 rounded shadow transition"
        >
          Print All
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse text-center">
        <thead className="bg-gray-100">
          <tr className="text-gray-700 uppercase text-sm">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">DOB</th>
            <th className="py-2 px-4">State</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="py-2 px-2">{emp.id}</td>

              <td className="py-2 px-2">
                <img
                  src={emp.image || DEFAULT_IMAGE}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto object-cover"
                />
              </td>

              <td className="py-2 px-2 text-gray-700">{emp.name}</td>
              <td className="py-2 px-2">{emp.gender}</td>
              <td className="py-2 px-2">{emp.dob}</td>
              <td className="py-2 px-2">{emp.state}</td>

              {/* Active toggle */}
              <td className="py-2 px-2">
                <input
                  type="checkbox"
                  checked={emp.active}
                  onChange={() =>
                    updateEmployee({ ...emp, active: !emp.active })
                  }
                  className="w-5 h-5 accent-green-500"
                />
              </td>

              {/* Actions */}
              <td className="py-2 px-2 flex justify-center gap-2">
                <button
                  onClick={() => setEditingEmployee(emp)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>

                <button
                  onClick={() => window.print()}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}

          {/* Empty state */}
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="p-6 text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
