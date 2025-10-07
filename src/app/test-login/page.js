"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    country_code: "",
    login_input: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  const handleChange = (e) => {
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
      
      if (!res.ok) throw new Error("Login failed");      await res.json();
      
      router.push("/customer/Home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Test Login</h2>        
        <input
          type="text"
          name="country_code"
          placeholder="Country Code"
          value={form.country_code}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />       
         <input
          type="text"
          name="login_input"
          placeholder="Email or Phone"
          value={form.login_input}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />       
         {error && <p className="text-red-500 text-sm">{error}</p>}        
         <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}