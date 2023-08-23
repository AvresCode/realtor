import { useEffect, useState } from 'react';
import Slider from '../components/Slider';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import ListingItem from '../components/ListingItem';
import { Link } from 'react-router-dom';

export default function Home() {
  const [listingsOffers, setListingsOffers] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setListingsOffers(listings);
        // console.log('OFFERS', listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6 my-10">
        {listingsOffers && listingsOffers.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="py-5 text-2xl mt-6 font-semibold">Recent offers</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listingsOffers.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>{' '}
            <Link to="/offers">
              <p className="p-2  text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
