import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contacts() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        questionText: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:8080/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to submit your question');
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                questionText: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-400 flex flex-col items-center py-10">
            <header className="flex flex-col items-center mb-8">
                <Link to="/home" className="flex items-center mb-2">
                    <img src="/images/logo.png" alt="Hospital Logo" className="h-16 w-16 rounded-full shadow-lg border-2 border-yellow-400" />
                </Link>
                <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow mb-1">Contact Us</h1>
                <p className="text-lg text-blue-900 font-medium">Working Hours: Monday-Friday, 9:00 AM - 5:00 PM</p>
            </header>

            <main className="w-full max-w-2xl">
                <section className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-yellow-200 mb-10">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center drop-shadow">Ask a Question</h2>
                    {success && <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 font-semibold shadow-lg border border-green-300 text-center">Your question has been submitted successfully!</div>}
                    {error && <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 font-semibold shadow-lg border border-red-300 text-center">{error}</div>}
                    <form id="question-form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-blue-900 mb-1 font-semibold">First Name</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-2 rounded-lg bg-white/80 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-blue-900 mb-1 font-semibold">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName" 
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-2 rounded-lg bg-white/80 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-blue-900 mb-1 font-semibold">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                className="w-full px-4 py-2 rounded-lg bg-white/80 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-blue-900 mb-1 font-semibold">Contact Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                required 
                                className="w-full px-4 py-2 rounded-lg bg-white/80 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="questionText" className="block text-blue-900 mb-1 font-semibold">Your Question</label>
                            <textarea 
                                id="questionText" 
                                name="questionText" 
                                value={formData.questionText}
                                onChange={handleChange}
                                required 
                                className="w-full px-4 py-2 rounded-lg bg-white/80 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[100px]"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 mt-2 rounded-xl bg-yellow-400 text-blue-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </section>

                <section className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-blue-200 text-center">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 drop-shadow">Connect with Us</h2>
                    <ul className="flex flex-col md:flex-row justify-center gap-6 text-lg font-semibold">
                        <li>
                            <a href="https://www.facebook.com/bitshyderabad" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/bitshyd" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-900 transition">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/bitshyderabad/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Contacts;