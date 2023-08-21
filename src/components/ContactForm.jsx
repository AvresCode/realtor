import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export default function ContactForm({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    async function fetchLandlordData() {
      const docRef = doc(db, 'users', userRef);
      const docSnap = await getDoc(docRef);
      setLandlord(docSnap.data());
      console.log('landlord', docSnap.data());
    }
    fetchLandlordData();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord && (
        <div className="mt-8">
          <p>
            Message {landlord.name} for the {listing.name.toLowerCase()}:
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            className="w-full px-4 py-2 my-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          ></textarea>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              type="button"
              className="px-7 py-3 bg-violet-700 text-white rounded text-sm uppercase shadow-md hover:bg-violet-800 hover:shadow-lg focus:bg-violet-900 focus:shadow-lg active:bg-violet-900  active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
            >
              Send message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
