import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import SearchFilter from "../components/SearchFilter";
import { useEmployee } from "../context/EmployeeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { employees } = useEmployee();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const active = filteredEmployees.filter((e) => e.active).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-10">
      {/* Logout Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-center">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">{filteredEmployees.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{active}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600">
            {filteredEmployees.length - active}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-6">
        <EmployeeForm />
      </div>

      <div className="max-w-7xl mx-auto mb-6">
        <SearchFilter setFilteredEmployees={setFilteredEmployees} />
      </div>

      <div className="max-w-7xl mx-auto">
        <EmployeeTable filteredEmployees={filteredEmployees} />
      </div>
    </div>
  );
}
