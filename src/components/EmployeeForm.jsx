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

  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState(null);

  /* ======================
     AUTO HIDE TOAST
  ====================== */
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /* ======================
     EDIT MODE
  ====================== */
  useEffect(() => {
    if (editingEmployee) {
      setForm({
        ...editingEmployee,
        image: editingEmployee.image || null
      });
    }
  }, [editingEmployee]);

  /* ======================
     IMAGE HANDLER
  ====================== */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  /* ======================
     RESET FORM (NO TOAST)
  ====================== */
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: null
    });
    setShowPreview(false);
    setEditingEmployee(null);
  };

  /* ======================
     RESET WITH TOAST
  ====================== */
  const handleReset = () => {
    resetForm();
    setToast({
      type: "info",
      message: "Form reset successfully"
    });
  };

  /* ======================
     SUBMIT
  ====================== */
  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.gender || !form.state) {
      setToast({
        type: "error",
        message: "Please fill all required fields"
      });
      return;
    }

    const data = {
      ...form,
      image: form.image || DEFAULT_IMAGE
    };

    if (form.id) {
      updateEmployee(data);
      setToast({
        type: "success",
        message: "Employee updated successfully"
      });
    } else {
      addEmployee({ ...data, id: Date.now() });
      setToast({
        type: "success",
        message: "Employee added successfully"
      });
    }

    resetForm();
  };

  return (
    <>
      {/* ======================
           TOAST
      ====================== */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300
          ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ======================
           FORM
      ====================== */}
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow-lg p-6 mb-6 max-w-7xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {form.id ? "Edit Employee" : "Add Employee"}
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="border p-3 rounded-lg"
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="date"
            className="border p-3 rounded-lg"
            value={form.dob}
            onChange={(e) =>
              setForm({ ...form, dob: e.target.value })
            }
          />

          <select
            className="border p-3 rounded-lg"
            value={form.state}
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
          >
            <option value="">State</option>
            <option>Andhra Pradesh</option>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Maharashtra</option>
          </select>
        </div>

        {/* Image + Preview */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border p-2 rounded-lg"
          />

          <img
            src={form.image || DEFAULT_IMAGE}
            alt="thumb"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <button
            type="button"
            disabled={!form.image}
            onClick={() => setShowPreview(true)}
            className={`text-sm underline ${
              form.image
                ? "text-blue-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Preview
          </button>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({ ...form, active: e.target.checked })
              }
              className="w-5 h-5 accent-green-500"
            />
            <label>Active</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {form.id ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>

      {/* ======================
           IMAGE PREVIEW MODAL
      ====================== */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative max-w-md w-full">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">
              Image Preview
            </h3>

            <img
              src={form.image || DEFAULT_IMAGE}
              alt="Preview"
              className="w-full max-h-[400px] object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
