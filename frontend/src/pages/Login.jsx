import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-start mb-6">
          <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
            <img src="/helpdesk.svg" alt="" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold  mb-6">Welcome to the service desk</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-1 rounded-lg font-medium hover:bg-gray-900 cursor-pointer transition"
          >
            Log in
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Forgot your password?
          <span className="ml-1 underline cursor-pointer">Reset</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
