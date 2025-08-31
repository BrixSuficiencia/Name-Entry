import './bootstrap';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    const [names, setNames] = useState([]);
    const [formData, setFormData] = useState({ first_name: '', last_name: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const fetchNames = async () => {
        try {
            const response = await fetch('/api/names');
            const data = await response.json();
            setNames(data);
        } catch (error) {
            console.error('Error fetching names:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isDuplicateName = (firstName, lastName) => {
        return names.some(
            (name) =>
                name.first_name.toLowerCase() === firstName.toLowerCase() &&
                name.last_name.toLowerCase() === lastName.toLowerCase()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.first_name.trim() || !formData.last_name.trim()) {
            setError('Both first name and last name are required');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            return;
        }

        if (isDuplicateName(formData.first_name.trim(), formData.last_name.trim())) {
            setError('A person with this first and last name already exists');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch('/api/names', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute('content'),
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to add name');

            const newName = await response.json();
            setNames((prev) => [newName, ...prev]);
            setFormData({ first_name: '', last_name: '' });
        } catch (error) {
            setError('Error adding name. Please try again.');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNames();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 flex justify-center">
            {/* Error Notification */}
            {showError && error && (
                <div className="fixed top-6 left-6 z-50 animate-in slide-in-from-top-2 duration-300">
                    <div
                    className="border-l-4 border-red-500 shadow-2xl rounded-lg px-6 py-4 max-w-sm"
                    style={{ backgroundColor: 'white' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 
                                        11-2 0 1 1 0 012 0zm-1-9a1 1 0 
                                        00-1 1v4a1 1 0 102 0V6a1 1 0 
                                        00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div>
                                    <p className="font-semibold text-red-800">Error</p>
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowError(false)}
                                className="ml-4 text-red-400 hover:text-red-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN CONTAINER */}
            <div className="w-96 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl p-8 px-12">
                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text">
                            Name Entry
                        </h1>
                        <p className="text-gray-500 text-sm">Enter a new name below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* First Name */}
                        <div className="flex items-center space-x-3">
                            <label
                                htmlFor="first_name"
                                className="w-24 text-sm font-medium text-gray-700 flex-shrink-0"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex items-center space-x-3">
                            <label
                                htmlFor="last_name"
                                className="w-24 text-sm font-medium text-gray-700 flex-shrink-0"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                                        hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 
                                        disabled:opacity-50 text-white font-semibold py-2 px-6 
                                        rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Names List Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Names List</h2>
                    <p className="text-gray-500 text-xs mb-4">All registered names</p>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">First Name</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Last Name</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {names.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="text-center py-6 text-gray-400">
                                            No names added yet
                                        </td>
                                    </tr>
                                ) : (
                                    names.map((name) => (
                                        <tr key={name.id} className="hover:bg-blue-50 transition">
                                            <td className="px-4 py-2 font-medium text-gray-800">{name.first_name}</td>
                                            <td className="px-4 py-2 font-medium text-gray-800">{name.last_name}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
