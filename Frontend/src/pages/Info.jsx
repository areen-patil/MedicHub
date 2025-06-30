import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Info() {
    const [departments, setDepartments] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        hodName: '',
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/departments');
            if (!response.ok) throw new Error('Failed to fetch departments');
            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            setError('Failed to load departments');
        } finally {
            setLoading(false);
        }
    };

    const handleServiceClick = async (serviceId) => {
        setActiveService(serviceId);
        try {
            const response = await fetch(`http://localhost:8080/api/departments/${serviceId}`);
            if (!response.ok) throw new Error('Failed to fetch department details');
            const data = await response.json();
            const updatedDepartments = departments.map(dept =>
                dept.id === serviceId ? { ...dept, description: data.description } : dept
            );
            setDepartments(updatedDepartments);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = formData.id
                ? `http://localhost:8080/api/departments/${formData.id}`
                : 'http://localhost:8080/api/departments';
            const response = await fetch(url, {
                method: formData.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to save department');
            await fetchDepartments();
            setShowAddForm(false);
            setFormData({ id: '', title: '', description: '', hodName: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (department) => {
        setFormData(department);
        setShowAddForm(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-400 py-10 px-2">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center gap-4 px-8 py-6 bg-white/40 backdrop-blur-md shadow-lg rounded-3xl mb-8">
                    <Link to="/home" className="flex items-center">
                        <img src="/images/logo.png" alt="Hospital Logo" className="h-12 w-12 rounded-full shadow-lg border-2 border-yellow-400" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg ml-4">Our Departments</h1>
                    <button
                        className="ml-auto px-5 py-2 rounded-xl bg-yellow-400 text-blue-900 font-bold shadow-lg hover:bg-yellow-300 transition"
                        onClick={() => {
                            setFormData({ id: '', title: '', description: '', hodName: '' });
                            setShowAddForm(true);
                        }}
                    >
                        + Add Department
                    </button>
                </header>

                {error && <div className="mb-4 p-4 rounded-xl bg-red-100 text-red-800 font-semibold shadow-lg border border-red-300 text-center">{error}</div>}

                {/* Modal for Add/Edit */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-yellow-200 relative">
                            <button
                                className="absolute top-3 right-3 text-blue-900 hover:text-red-500 text-2xl font-bold"
                                onClick={() => setShowAddForm(false)}
                                title="Close"
                            >×</button>
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 drop-shadow">{formData.id ? 'Edit' : 'Add'} Department</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Department Name"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <input
                                    type="text"
                                    placeholder="HOD Name"
                                    value={formData.hodName}
                                    onChange={(e) => setFormData({ ...formData, hodName: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <textarea
                                    placeholder="Department Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[100px]"
                                />
                                <div className="flex gap-3 justify-end">
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-yellow-400 text-blue-900 font-bold shadow hover:bg-yellow-300 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-xl bg-blue-100 text-blue-900 font-bold shadow hover:bg-blue-200 transition"
                                        onClick={() => setShowAddForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center text-blue-900 text-xl font-bold">Loading departments...</div>
                    ) : (
                        departments.map((department) => (
                            <div
                                key={department.id}
                                className={`relative group cursor-pointer bg-white/60 backdrop-blur-md border border-yellow-200 rounded-2xl shadow-xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
                                onClick={() => handleServiceClick(department.id)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className="text-xl font-bold text-blue-900">{department.title}</div>
                                        <div className="text-sm text-blue-700">HOD: {department.hodName}</div>
                                    </div>
                                    <button
                                        className="px-3 py-1 rounded-lg bg-yellow-400 text-blue-900 font-semibold shadow hover:bg-yellow-300 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(department);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                                {activeService === department.id && (
                                    <div className="mt-3 p-3 rounded-xl bg-blue-50 text-blue-900 shadow-inner border border-blue-200">
                                        {department.description}
                                    </div>
                                )}
                                <div className={`absolute inset-0 rounded-2xl border-4 border-yellow-400 pointer-events-none transition-all duration-200 ${activeService === department.id ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Info;