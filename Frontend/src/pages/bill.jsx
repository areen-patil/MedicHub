import { useState } from 'react';
import { Link } from 'react-router-dom';

function Bill() {
    const [formData, setFormData] = useState({
        patientName: '',
        services: '',
        totalAmount: '',
        paymentStatus: 'Unpaid',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:8080/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    totalAmount: parseFloat(formData.totalAmount)
                }),
            });
            if (!response.ok) throw new Error('Failed to save bill');
            setSuccess(true);
            setFormData({
                patientName: '',
                services: '',
                totalAmount: '',
                paymentStatus: 'Unpaid',
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-zinc-900 to-blue-700 py-10">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-yellow-200">
            <header className="flex justify-center mb-6">
            <Link to="/home" className="flex items-center">
                <img src="/images/logo.png" alt="Hospital Logo" className="h-14 w-14 rounded-full shadow-lg border-2 border-yellow-400" />
            </Link>
                </header>
                <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8 drop-shadow-lg">Generate Bill</h1>
                {error && <div className="mb-4 p-3 rounded-xl bg-red-900/80 text-red-200 font-semibold shadow-lg border border-red-700 text-center">{error}</div>}
                {success && <div className="mb-4 p-3 rounded-xl bg-green-900/80 text-green-200 font-semibold shadow-lg border border-green-700 text-center">Bill saved successfully!</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="patientName" className="block text-gray-300 mb-1 font-semibold">Patient Name</label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="services" className="block text-gray-300 mb-1 font-semibold">Services</label>
                        <input
                            type="text"
                            id="services"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="totalAmount" className="block text-gray-300 mb-1 font-semibold">Total Amount (₹)</label>
                        <input
                            type="number"
                            id="totalAmount"
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="paymentStatus" className="block text-gray-300 mb-1 font-semibold">Payment Status</label>
                        <select
                            id="paymentStatus"
                            name="paymentStatus"
                            value={formData.paymentStatus}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 rounded-xl bg-yellow-400 text-black font-bold text-lg shadow-lg hover:bg-yellow-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Bill'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Bill;