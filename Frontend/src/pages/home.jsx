import { Link } from 'react-router-dom';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FAQSection from './FAQSection';
import '../index.css'; // Tailwind import should be last

function Home() {
    return (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"    >
            <header className="py-8 px-4 flex flex-col items-center">
                <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                    <span className="text-yellow-400">Mufasa</span> Hospitals
                </h1>
            </header>
<nav className="flex flex-wrap justify-center gap-4 mb-8">
                <Link to="/contacts" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Contact Us
                </Link>
                <Link to="/appointments" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Appointments
                </Link>
                <Link to="/information" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Information
                </Link>
                <Link to="/prescription" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Prescription Reminders
                </Link>
                <Link to="/bill" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Generate Bill
                </Link>
                <Link to="/news" className="px-4 py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                    Latest News
                </Link>
                <Link to="/login" className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-400 hover:text-black transition font-semibold shadow">
                    Logout
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="dark" className="bg-black text-yellow-400 border-none hover:bg-yellow-400 hover:text-black transition font-semibold shadow">
                        More
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/aboutus">About Us</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/help">Help</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>

            <div className="relative flex justify-center items-center mb-12">
                <video
                    className="rounded-3xl shadow-2xl w-full max-w-3xl object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/home.mp4"
                    type="video/mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl pointer-events-none"></div>
                <div className="absolute left-0 right-0 bottom-8 px-8 flex flex-col items-center z-10">
                    <h2 className="text-3xl font-bold text-amber-700 mb-2 drop-shadow">Welcome to Mufasa Hospitals</h2>
                    <p className="text-lg text-gray-200">Your health, our priority.</p>
                </div>
            </div>

             <main className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <section className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2"  style={{ color: "#facc15" }}>Latest News 1</h2>
                    <p className="text-red-400">Reschedule in Pediatrician visit.</p>
                </section>
                <section className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800"> 
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2" style={{ color: "#facc15" }}>Latest News 2</h2>
                    <p className="text-red-400">A seminar on personal hygiene will be conducted on 27th.</p>
                </section>
                <section className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2" style={{ color: "#facc15" }}>Latest News 3</h2>
                    <p className="text-red-400">This is the third news section.</p>
                </section>
            </main>

            <section id="faq" className="max-w-3xl mx-auto mb-16">
                <FAQSection />
            </section>

            <footer className="py-6 text-center text-gray-400 border-t border-zinc-800">
                &copy; Health Hub 2025
            </footer>
        </div>
    );
}

export default Home;