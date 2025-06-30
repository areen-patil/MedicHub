import { useState } from 'react';
import { Link } from 'react-router-dom';

function Prescription() {
    const [formData, setFormData] = useState({
        appointment_id: '',
        medications: '',
        dosage: '',
        instructions: ''
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
            const response = await fetch('http://localhost:8080/api/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save prescription');
            }

            setSuccess(true);
            setFormData({
                appointment_id: '',
                medications: '',
                dosage: '',
                instructions: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#581c87] flex flex-col items-center py-10 px-2">
            <header className="flex items-center gap-4 px-8 py-6 bg-[#18181b]/90 shadow-lg rounded-3xl mb-8 border border-cyan-400 w-full max-w-lg">
                <Link to="/home" className="flex items-center">
                    <img src="/images/logo.png" alt="Hospital Logo" className="h-12 w-12 rounded-full shadow-lg border-2 border-cyan-400" />
                </Link>
                <h1 className="text-3xl font-extrabold text-cyan-300 tracking-tight drop-shadow-neon ml-4">Create Prescription</h1>
            </header>
            <section className="w-full max-w-lg bg-[#18181b]/90 border border-cyan-400 rounded-3xl shadow-2xl p-8">
                {error && <div className="mb-4 p-3 rounded-xl bg-pink-900/80 text-pink-200 font-semibold shadow-lg border border-pink-700 text-center">{error}</div>}
                {success && <div className="mb-4 p-3 rounded-xl bg-green-900/80 text-green-200 font-semibold shadow-lg border border-green-700 text-center">Prescription saved successfully!</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="appointment_id" className="block text-cyan-300 mb-1 font-semibold">Appointment ID</label>
                        <input
                            type="text"
                            id="appointment_id"
                            name="appointment_id"
                            value={formData.appointment_id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="medications" className="block text-cyan-300 mb-1 font-semibold">Medications</label>
                        <textarea
                            id="medications"
                            name="medications"
                            value={formData.medications}
                            onChange={handleChange}
                            required
                            maxLength="500"
                            placeholder="Enter medications..."
                            className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[80px]"
                        />
                    </div>
                    <div>
                        <label htmlFor="dosage" className="block text-cyan-300 mb-1 font-semibold">Dosage</label>
                        <input
                            type="text"
                            id="dosage"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                            placeholder="Enter dosage..."
                            className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="instructions" className="block text-cyan-300 mb-1 font-semibold">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            required
                            maxLength="500"
                            placeholder="Enter instructions..."
                            className="w-full px-4 py-2 rounded-lg bg-[#23272f] text-cyan-200 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[80px]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 rounded-xl bg-cyan-400 text-black font-bold text-lg shadow-lg hover:bg-pink-400 hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Prescription'}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Prescription;