import { useEffect, useState } from "react";
import { useEmployee } from "../context/EmployeeContext";

const DEFAULT_IMAGE =
  "https://www.w3schools.com/howto/img_avatar.png";

export default function EmployeeForm() {
  const {
    addEmployee,
    updateEmployee,
    editingEmployee,
    setEditingEmployee
  } = useEmployee();

  const [form, setForm] = useState({
    id: null,
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: null
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        ...editingEmployee,
        image: editingEmployee.image || null
      });
    }
  }, [editingEmployee]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.gender || !form.state) {
      alert("Please fill all fields");
      return;
    }

    const employeeData = {
      ...form,
      image: form.image || DEFAULT_IMAGE
    };

    if (form.id) {
      updateEmployee(employeeData);
      setEditingEmployee(null);
    } else {
      addEmployee({ ...employeeData, id: Date.now() });
    }

    setForm({
      id: null,
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: null
    });
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-6 max-w-8xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {form.id ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          placeholder="Full Name"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm placeholder-gray-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />

        <select
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        >
          <option value="">State</option>
          <option>Andhra Pradesh</option>
          <option>Tamil Nadu</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Maharashtra</option>
        </select>
      </div>

      {/* Image + Status */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border p-2 rounded-lg bg-gray-50 shadow-sm w-full sm:w-auto"
        />

        <div className="w-24 h-24 border rounded-full overflow-hidden shadow-md">
          <img
            src={form.image || DEFAULT_IMAGE}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm({ ...form, active: e.target.checked })
            }
            id="active"
            className="w-5 h-5 accent-green-500"
          />
          <label htmlFor="active" className="font-medium text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition">
          {form.id ? "Update Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
