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
  //Get offered listings
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

  //Get rent listings
  const [rentListings, setRentListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('type', '==', 'rent'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setRentListings(listings);
        // console.log('RENT', listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  //Get sale listings
  const [saleListings, setSaleListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('type', '==', 'sale'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });
        setSaleListings(listings);
        console.log('SALE', listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-40 mt-10 mb-52">
        {listingsOffers && listingsOffers.length > 0 && (
          <div className="mx-10 mt-10">
            <h2 className="py-5 text-2xl font-semibold">Recent Offers</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                Discover More Deals
              </p>
            </Link>
          </div>
        )}{' '}
        {rentListings && rentListings.length > 0 && (
          <div className="mx-10">
            <h2 className="py-5 text-2xl font-semibold">
              Renting Opportunities
            </h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>{' '}
            <Link to="/category/rent">
              <p className="p-2  text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Explore More Rental Spaces
              </p>
            </Link>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="mx-10">
            <h2 className="py-5 text-2xl font-semibold">Sale Opportunities</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>{' '}
            <Link to="/category/sale">
              <p className="p-2  text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Explore More Available Sales
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
