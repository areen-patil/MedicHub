import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Appointments() {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        doctorName: '',
        patientName: '',
        appointmentTime: '',
        appointmentDate: '',
        status: 'SCHEDULED',
        email: ''
    });

    const [doctors, setDoctors] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/doctors');
                if (!response.ok) throw new Error('Failed to fetch doctors');
                const data = await response.json();
                setDoctors(data);
            } catch (err) {
                setError('Failed to load doctors. Please try again later.');
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'doctorId') {
                const selectedDoctor = doctors.find(d => d.id === parseInt(value));
                return {
                    ...prev,
                    doctorId: parseInt(value),
                    doctorName: selectedDoctor ? selectedDoctor.name : ''
                };
            }
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const appointmentData = {
                ...formData,
                appointmentTime: `${formData.appointmentTime}:00`,
                appointmentDate: formData.appointmentDate
            };

            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to book appointment');
            }

            await response.json();
            setShowConfirmation(true);
        } catch (err) {
            setError(err.message);
            setShowConfirmation(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-zinc-900 to-blue-700 flex flex-col items-center justify-center py-10">
            <header className="flex items-center gap-4 px-8 py-6 bg-zinc-900/80 shadow-lg rounded-b-3xl w-full max-w-2xl mb-8">
                <Link to="/home" className="flex items-center">
                    <img src="/images/logo.png" alt="Hospital Logo" className="h-12 w-12 rounded-full shadow-lg border-2 border-yellow-400" />
                </Link>
                <h1 className="text-3xl font-extrabold text-yellow-400 tracking-tight drop-shadow-lg ml-4">Medical Appointment Booking</h1>
            </header>
            <main className="w-full max-w-2xl">
                {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-900/80 text-red-200 font-semibold shadow-lg border border-red-700 text-center">
                        {error}
                    </div>
                )}
                <section className={`${showConfirmation ? 'hidden' : ''} bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-yellow-200`}>
                    <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center drop-shadow">Book an Appointment</h2>
                    <form id="bookingForm" onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="patientId" className="block text-gray-300 mb-1 font-semibold">Patient ID:</label>
                                <input
                                    type="number"
                                    id="patientId"
                                    name="patientId"
                                    value={formData.patientId}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Enter your patient ID"
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="doctorId" className="block text-gray-300 mb-1 font-semibold">Select Doctor:</label>
                                <select
                                    name="doctorId"
                                    id="doctorId"
                                    value={formData.doctorId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="appointmentDate" className="block text-gray-300 mb-1 font-semibold">Select Date:</label>
                                <input
                                    type="date"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="appointmentTime" className="block text-gray-300 mb-1 font-semibold">Select Time:</label>
                                <input
                                    type="time"
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    value={formData.appointmentTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="patientName" className="block text-gray-300 mb-1 font-semibold">Your Name:</label>
                            <input
                                type="text"
                                id="patientName"
                                name="patientName"
                                placeholder="Your Name"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-300 mb-1 font-semibold">Your Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-4 rounded-xl bg-yellow-400 text-black font-bold text-lg shadow-lg hover:bg-yellow-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </form>
                </section>

                <section className={`${showConfirmation ? '' : 'hidden'} bg-zinc-900/80 rounded-3xl shadow-2xl p-8 border border-zinc-800 text-center`}>
                    <h2 className="text-2xl font-bold text-green-400 mb-4 drop-shadow">Appointment Confirmed!</h2>
                    <p className="text-lg text-gray-200 mb-6">
                        Thank you, <span className="font-bold text-yellow-400">{formData.patientName}</span>!<br />
                        Your appointment has been scheduled for{' '}
                        <span className="font-bold text-yellow-400">{formData.appointmentDate}</span> at{' '}
                        <span className="font-bold text-yellow-400">{formData.appointmentTime}</span>.
                    </p>
                    <Link to="/home" className="inline-block px-6 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold transition shadow">
                        Back to Home
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default Appointments;