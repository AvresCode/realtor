import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function OAuth() {
  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full bg-amber-400  py-3 uppercase text-sm font-semibold rounded hover:bg-amber-500 active:bg-amber-600  shadow-md hover:shadow-lg transition duration-150 ease-in-out"
    >
      <FcGoogle className="text-2xl mr-2 bg-white rounded-full" />
      Continue with Google
    </button>
  );
}
