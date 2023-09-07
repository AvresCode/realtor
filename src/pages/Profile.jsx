import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import ListingItem from '../components/ListingItem';
export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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
  async function onDelete(listingID) {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success('Listing deleted');
    }
  }
  function onListingEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }

  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, 'listings');
      const queryListing = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(queryListing);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });
      setListings(listings);
      setLoading(false);
      // console.log('listings', listings);
    }
    fetchUserListing();
  }, []);

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
          <button className="w-full bg-[#275576ff]  text-white py-3 px-6 text-sm font-semibold rounded shadow-md uppercase hover:bg-[#1f425cff] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#142c3dff]">
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
      {/* this div fix the image ration problem but the size of div will be the same for all screens */}
      {/* <div className="flex justify-center items-center "> */}
      <div className="max-w-6xl px-4 my-12 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 ">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onListingEdit={() => onListingEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
