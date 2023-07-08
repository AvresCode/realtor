import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function OAuth() {
  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      //check the user
      //make a reference to the user
      const docRef = doc(db, 'users', user.uid);

      //check if the user is already available
      const docSnap = await getDoc(docRef);

      //if it doesn't exist, add it to the database
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
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
