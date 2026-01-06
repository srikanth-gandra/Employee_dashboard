import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({
        type: "error",
        message: "Email and password are required"
      });
      return;
    }

    const res = login(email, password);
    if (res.success) {
      setToast({
        type: "success",
        message: "Login successful"
      });

      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      setToast({
        type: "error",
        message: res.message
      });
    }
  };

  return (
    <>
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white
          ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Employee Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            Login
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Demo credentials:
            <br />
            <span className="font-medium">
              sri@gmail.com / Sri@123
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
