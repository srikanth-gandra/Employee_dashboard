import { useState, useEffect } from "react";
import { useEmployee } from "../context/EmployeeContext";

export default function SearchFilter({ setFilteredEmployees }) {
  const { employees } = useEmployee();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let filtered = [...employees];

    if (search) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (gender) {
      filtered = filtered.filter(emp => emp.gender === gender);
    }

    if (status) {
      const activeStatus = status === "active";
      filtered = filtered.filter(emp => emp.active === activeStatus);
    }

    setFilteredEmployees(filtered);
  }, [search, gender, status, employees, setFilteredEmployees]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md mb-6 p-4 w-full max-w-8xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      
      <input
        type="text"
        placeholder="Search by name"
        className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-full sm:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-full sm:w-1/4"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm w-full sm:w-1/4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
