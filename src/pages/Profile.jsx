import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const { name, email } = formData;
  return (
    <>
      <section className="max-w-6xl flex flex-col justify-center items-center mx-auto">
        <h1 className="text-3xl text-center mt-10 font-bold">My Profile</h1>
        <div className="w-full md:w-[60%] px-5 mt-10">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out "
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out "
            />
            <div className="flex justify-between text-sm md:text-lg mb-6">
              <p>
                Do you want to change your name?
                <span className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-2">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
