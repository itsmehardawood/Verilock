"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TestLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    country_code: "",
    login_input: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");
      await res.json();

      router.push("/user/Home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d3rfyed8zhcsm.cloudfront.net/Header2.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for contrast */}
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg"
              >
                {/* Optional logo video here if needed */}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Test Login
          </h2>

          <input
            type="text"
            name="country_code"
            placeholder="Country Code"
            value={form.country_code}
            onChange={handleChange}
            className="w-full border text-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="login_input"
            placeholder="Email or Phone"
            value={form.login_input}
            onChange={handleChange}
            className="w-full border text-gray-500 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center">
            <span className="text-sm text-gray-600">
                 New to our App?{" "}
                  <Link
                   href="/test-signup"
                   className="font-medium text-blue-600 hover:text-blue-500"
                  >
                  Create account
                  </Link>
             </span>
        </div>
      </div>
    </div>
  );
}
