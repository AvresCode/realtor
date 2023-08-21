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
        <div>
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
          ></textarea>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button type="button"> Send message</button>
          </a>
        </div>
      )}
    </>
  );
}
