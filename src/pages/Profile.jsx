import { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const [changeDetails, setChangeDetails] = useState(false);

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    try {
      if (auth.currentUser.displayName !== name) {
        //update user data in firebase
        await updateProfile(auth.currentUser, { displayName: name });

        //update name in firestore
        //first create reference to the user
        const docRef = doc(db, 'users', auth.currentUser.uid);

        await updateDoc(docRef, { name: name });
      }
      toast.success('Profile details updated');
    } catch (error) {
      toast.error('Could not update profile details');
    }
  }
  const onEdit = () => {
    //if changeDetails is true, call onSubmit first
    changeDetails && onSubmit();
    setChangeDetails((prevState) => !prevState);
  };

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

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
              disabled={!changeDetails}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out ${
                changeDetails && 'bg-red-200'
              }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetails}
              onChange={onChange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition ease-in-out "
            />
            <div className="flex justify-between text-sm md:text-lg mb-6">
              <p>
                Do you want to change your name?
                <span
                  onClick={onEdit}
                  className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-2"
                >
                  {changeDetails ? 'Apply changes' : 'Edit'}
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
          <button className="w-full bg-violet-700  text-white py-3 px-6 text-sm font-semibold rounded shadow-md uppercase hover:bg-violet-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-violet-900">
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="text-3xl mr-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
