import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-zinc-900 to-blue-700 text-white flex flex-col">
            <header className="flex items-center gap-4 px-8 py-6 bg-zinc-900/80 shadow-lg rounded-b-3xl">
                <Link to="/home" className="flex items-center">
                    <img src="/images/logo.png" alt="Hospital Logo" className="h-12 w-12 rounded-full shadow-lg border-2 border-yellow-400" />
                </Link>
                <h1 className="text-3xl font-extrabold text-yellow-400 tracking-tight drop-shadow-lg ml-4">About Us</h1>
            </header>

            <section className="flex flex-col items-center justify-center py-12 px-4">
                <div className="max-w-2xl text-center mb-10">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-4 drop-shadow">Welcome to <span className="text-white">Mufasa Hospitals</span></h2>
                    <p className="text-lg text-gray-200">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, 
                        euismod euismod nisi nisi euismod nisi.
                    </p>
                </div>
            </section>

            <section className="flex flex-col md:flex-row gap-8 justify-center items-stretch px-4 mb-16">
                <div className="flex-1 bg-zinc-900/80 rounded-2xl shadow-xl p-8 border border-zinc-800">
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">Our Mission</h3>
                    <p className="text-gray-200">
                        To provide world-class healthcare services with compassion and care. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <div className="flex-1 bg-zinc-900/80 rounded-2xl shadow-xl p-8 border border-zinc-800">
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">Our Vision</h3>
                    <p className="text-gray-200">
                        To be the leading healthcare provider in the region, 
                        setting benchmarks in medical excellence and patient care.
                    </p>
                </div>
                <div className="flex-1 bg-zinc-900/80 rounded-2xl shadow-xl p-8 border border-zinc-800">
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">Our Values</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                        <li>Compassion</li>
                        <li>Integrity</li>
                        <li>Innovation</li>
                        <li>Excellence</li>
                    </ul>
                </div>
            </section>

            <section className="py-12 px-4 bg-zinc-900/60 rounded-3xl mx-4 mb-16 shadow-2xl border border-zinc-800">
                <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8 drop-shadow">Meet Our Team</h2>
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="bg-zinc-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-zinc-700">
                        <img src="/images/doctor1.png" alt="Doctor 1" className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400 shadow" />
                        <h4 className="text-xl font-semibold text-white mb-1">Dr. Jane Doe</h4>
                        <p className="text-yellow-300">Chief Medical Officer</p>
                    </div>
                    <div className="bg-zinc-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-zinc-700">
                        <img src="/images/doctor2.png" alt="Doctor 2" className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400 shadow" />
                        <h4 className="text-xl font-semibold text-white mb-1">Dr. John Smith</h4>
                        <p className="text-yellow-300">Head of Surgery</p>
                    </div>
                    <div className="bg-zinc-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-zinc-700">
                        <img src="/images/doctor3.png" alt="Doctor 3" className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400 shadow" />
                        <h4 className="text-xl font-semibold text-white mb-1">Dr. Emily White</h4>
                        <p className="text-yellow-300">Lead Pediatrician</p>
                    </div>
                </div>
            </section>

            <footer className="py-6 text-center text-gray-400 border-t border-zinc-800 mt-auto">
                &copy; 2025 Mufasa Hospitals. All rights reserved.
            </footer>
        </div>
    );
}

export default AboutUs;