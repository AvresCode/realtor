import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(true);
  const params = useParams();
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(8)
        );

        const querySnap = await getDocs(q);
        const lastListing = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastListing);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLoading(false);
        console.log('listings', listings);
      } catch (error) {
        toast.error('Something went wrong with fetching the listings');
      }
    }
    fetchListings();
  }, []);

  async function fetchMoreListings() {
    try {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(4)
      );

      const querySnap = await getDocs(q);
      const lastListing = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastListing);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
      console.log('listings', listings);
    } catch (error) {
      toast.error('Something went wrong with fetching the listings');
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3 pt-4 mt-10 mb-52">
      <h1 className="text-3xl text-center my-10 font-bold ">
        {params.categoryName === 'rent'
          ? 'Properties for Rent'
          : 'Properties for Sale'}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <div>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
              />
            ))}
          </ul>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={() => fetchMoreListings()}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>
          {params.categoryName === 'rent'
            ? 'Currently No Listings for Rent'
            : 'Currently No Listings for Sale'}
        </p>
      )}
    </div>
  );
}
