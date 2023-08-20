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

export default function OneListing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  const params = useParams();
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log('one listing:', docSnap.data());
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
        className="fixed top-[15%] right-[5%] z-10 bg-orange-300 p-2 rounded-full cursor-pointer"
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
        <p className="fixed top-[22%] right-[3%]  rounded-md bg-white z-10 p-2 text-sm font-semibold">
          Link Copied
        </p>
      )}
    </main>
  );
}
