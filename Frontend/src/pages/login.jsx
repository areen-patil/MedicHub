import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-zinc-900 to-blue-700">
            <div className="backdrop-blur-lg bg-zinc-900/80 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-zinc-800">
                <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-8 drop-shadow-lg">
                    Welcome to <span className="text-white">Health Hub</span>
                </h1>

                {/* Google Sign-In Button */}
                {/* <div id="g_id_onload"
                    data-client_id="http://627164574521-6napvob87b6ps9t0q9r8tdo0518jk53e.apps.googleusercontent.com/"
                    data-login_uri="https://your.domain/your_login_endpoint"
                    data-auto_prompt="false">
                </div> */}
                {/* <div className="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div> */}
                
                <button className="flex items-center justify-center gap-3 w-full py-3 mb-8 rounded-xl bg-white/90 hover:bg-yellow-400 transition text-zinc-900 font-bold text-lg shadow-lg hover:shadow-yellow-200/50 border border-zinc-200">
                    <img 
                        src="/images/googleIcon.png" 
                        alt="Google icon" 
                        className="w-6 h-6"
                    />
                    Sign in with Google
                </button>

                <div className="flex flex-col gap-3">
                    <Link to="/home" className="w-full text-center py-2 rounded-lg bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold transition shadow">
                        Go to Home
                    </Link>
                    <Link to="/user/login" className="w-full text-center py-2 rounded-lg bg-zinc-800 text-blue-300 hover:bg-blue-500 hover:text-white font-semibold transition shadow">
                        Login as User
                    </Link>
                    <Link to="/doctor/login" className="w-full text-center py-2 rounded-lg bg-zinc-800 text-pink-300 hover:bg-pink-500 hover:text-white font-semibold transition shadow">
                        Login as Doctor
                    </Link>
                    <Link to="/register/user" className="w-full text-center py-2 rounded-lg bg-zinc-800 text-green-300 hover:bg-green-500 hover:text-white font-semibold transition shadow">
                        Register as User
                    </Link>
                    <Link to="/register/doctor" className="w-full text-center py-2 rounded-lg bg-zinc-800 text-purple-300 hover:bg-purple-500 hover:text-white font-semibold transition shadow">
                        Register as Doctor
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;