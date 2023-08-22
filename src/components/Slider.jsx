import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const listingRef = collection(db, 'listings');

      //Get the last five listings
      // const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      // const docSnap = await getDocs(q);

      const docSnap = await getDocs(listingRef);
      let listings = [];
      docSnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });

      // Shuffle the listings array using sort with a random comparison
      listings.sort(() => Math.random() - 0.5);

      // Get the first 5 listings
      const randomListings = listings.slice(0, 5);
      // console.log('random listings', randomListings);

      setListings(randomListings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
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
        {listings &&
          listings.map((listing, index) => (
            <SwiperSlide key={index}>
              <div
                key={index}
                style={{
                  background: `url(${listing.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className="relative w-full overflow-hidden h-[300px] md:h-[400px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>{' '}
    </>
  );
}
