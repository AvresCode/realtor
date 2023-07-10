import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent!');
    } catch (error) {
      toast.error('Could not send reset password');
    }
  }

  return (
    <section>
      <h1 className="text-center text-2xl font-bold pt-10">Forgot Password</h1>
      <div className="max-w-6xl flex justify-center items-center flex-wrap py-12 px-6 mx-auto">
        <div className="md:w-[60%] lg:w-[40%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[60%] lg:w-[40%] lg:ml-20 ">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out bg-white border-gray-300 rounded-md mb-6"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="text-red-500 hover:text-red-600 ml-1 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-violet-700  text-white py-3 px-6 text-sm font-semibold rounded shadow-md uppercase hover:bg-violet-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-violet-900"
            >
              Send reset password
            </button>
            {/* <div className="flex items-center  my-5 before:flex-1 before:border-t before:border-gray-700 after:flex-1 after:border-t after:border-gray-700"> */}
            <p className="font-semibold text-center flex items-center gap-4 my-6 before:flex-1 before:border-t before:border-gray-700 after:flex-1 after:border-t after:border-gray-700">
              OR
            </p>
            {/* </div> */}
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
