import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function News() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '', content: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/news');
            if (!res.ok) throw new Error('Failed to fetch news');
            const data = await res.json();
            setNewsList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = formData.id
                ? `http://localhost:8080/api/news/${formData.id}`
                : 'http://localhost:8080/api/news';
            const method = formData.id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to save news');
            setShowForm(false);
            setFormData({ id: '', title: '', content: '' });
            await fetchNews();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (news) => {
        setFormData(news);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this news item?')) return;
        try {
            const res = await fetch(`http://localhost:8080/api/news/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete news');
            await fetchNews();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#581c87] text-white py-10 px-2">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center gap-4 px-8 py-6 bg-[#18181b]/90 shadow-lg rounded-3xl mb-8 border border-cyan-400">
                    <Link to="/home" className="flex items-center">
                        <img src="/images/logo.png" alt="Hospital Logo" className="h-12 w-12 rounded-full shadow-lg border-2 border-cyan-400" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-cyan-300 tracking-tight drop-shadow-neon ml-4">News Management</h1>
                    <button
                        className="ml-auto px-5 py-2 rounded-xl bg-cyan-400 text-black font-bold shadow-lg hover:bg-pink-400 hover:text-white transition ring-2 ring-cyan-400/70"
                        onClick={() => { setFormData({ id: '', title: '', content: '' }); setShowForm(true); }}
                    >
                        + Add News
                    </button>
                </header>
                {error && <div className="mb-4 p-4 rounded-xl bg-pink-900/80 text-pink-200 font-semibold shadow-lg border border-pink-700 text-center">{error}</div>}
                {loading ? (
                    <div className="text-center text-cyan-300 text-xl font-bold">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {newsList.length === 0 && <div className="text-gray-400 text-center">No news found.</div>}
                        {newsList.map((news) => (
                            <div
                                className="relative group bg-[#18181b]/90 border border-cyan-400 rounded-2xl shadow-xl p-6 transition-all duration-200 hover:shadow-pink-400/40"
                                key={news.id}
                            >
                                <div className="text-xl font-bold text-cyan-300 mb-2 drop-shadow-neon">{news.title}</div>
                                <div className="text-gray-200 mb-4">{news.content}</div>
                                <div className="flex gap-3">
                                    <button
                                        className="px-4 py-1 rounded-lg bg-cyan-400 text-black font-semibold shadow hover:bg-pink-400 hover:text-white transition"
                                        onClick={() => handleEdit(news)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-1 rounded-lg bg-pink-500 text-white font-semibold shadow hover:bg-cyan-400 hover:text-black transition"
                                        onClick={() => handleDelete(news.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                            </div>
                        ))}
                    </div>
                )}

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#18181b]/95 border-2 border-cyan-400 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                            <button
                                className="absolute top-3 right-3 text-cyan-300 hover:text-pink-400 text-2xl font-bold"
                                onClick={() => setShowForm(false)}
                                title="Close"
                            >×</button>
                            <h2 className="text-2xl font-bold text-cyan-300 mb-4 drop-shadow-neon">{formData.id ? 'Edit News' : 'Add News'}</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                <textarea
                                    placeholder="Content"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[100px]"
                                />
                                <div className="flex gap-3 justify-end">
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-bold shadow hover:bg-pink-400 hover:text-white transition"
                                    >
                                        {formData.id ? 'Update' : 'Add'}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-xl bg-[#23272f] text-cyan-400 font-bold shadow hover:bg-pink-400 hover:text-white transition"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default News;