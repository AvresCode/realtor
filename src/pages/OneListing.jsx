import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { BsShareFill } from 'react-icons/bs';
import { MdKingBed } from 'react-icons/md';
import { FaBath, FaParking, FaMapMarkerAlt, FaChair } from 'react-icons/fa';
import { auth } from '../firebase';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

export default function OneListing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const params = useParams();
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        // console.log('one listing:', docSnap.data());
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        effect={'fade'}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          //   type: 'progressbar',
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px] md:h-[400px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="absolute top-[15%] right-[5%] z-10 bg-orange-300 p-2 rounded-full cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setLinkCopied(true);
          setTimeout(() => {
            setLinkCopied(false);
          }, 3000);
        }}
      >
        <BsShareFill />
      </div>
      {linkCopied && (
        <p className="absolute top-[22%] right-[3%]  rounded-md bg-white z-10 p-2 text-sm font-semibold">
          Link Copied
        </p>
      )}
      <div className="my-14 mx-4 flex flex-col lg:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5 ">
        <div className="w-full my-6">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${' '}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' ? ' / month' : ''}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className=" text-lg mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[85%] my-6">
            <p className=" w-full max-w-[200px] b bg-amber-600 rounded-full p-1  text-center text-white font-semibold shadow-md">
              {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px]  bg-teal-700 rounded-full p-1 text-center text-white font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-6 text-sm font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <MdKingBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : '1 Bed'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? 'Parking spot' : 'No parking'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? 'Furnished' : 'Not furnished'}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !showContactForm && (
            <button
              onClick={() => setShowContactForm(true)}
              className="my-8 px-7 py-3  bg-violet-700 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-violet-800 hover:shadow-lg focus:bg-violet-900 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
            >
              Contact landlord
            </button>
          )}
          {showContactForm && (
            <ContactForm userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="w-full my-6">
          <Map listing={listing} />
        </div>
      </div>
    </main>
  );
}
