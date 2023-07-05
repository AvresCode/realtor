import { FcGoogle } from 'react-icons/fc';
export default function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-amber-400  py-3 uppercase text-sm font-semibold rounded hover:bg-amber-500 active:bg-amber-600  shadow-md hover:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-2xl mr-2 bg-white rounded-full" />
      Continue with Google
    </button>
  );
}
