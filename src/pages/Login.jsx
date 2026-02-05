import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Ticket } from 'lucide-react';
import { useState } from 'react';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-start mb-6">
          <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
            <img src="/helpdesk.svg" alt="" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold  mb-6">Welcome to the service desk</h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-1 rounded-lg font-medium hover:bg-gray-900 cursor-pointer transition"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Forgot your password?
          <span className="ml-1 underline cursor-pointer">Reset</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
