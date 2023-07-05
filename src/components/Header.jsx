import { useLocation, useNavigate } from 'react-router';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(navigate);

  function pathMatchRoute(route) {
    if (location.pathname === route) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-md sticky top-0 z-50">
      <header className="flex justify-between items-center  px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="./realestate.png"
            alt="home"
            className=" h-16 cursor-pointer rounded-md"
            onClick={() => navigate('/')}
          />
        </div>
        <div>
          <ul className="flex space-x-10 text-gray-500">
            <li
              className={`font-semibold py-3 cursor-pointer ${
                pathMatchRoute('/') &&
                'border-b-[3px] border-b-purple-400 text-black'
              }`}
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li
              className={`font-semibold  py-3 cursor-pointer ${
                pathMatchRoute('/offers') &&
                'border-b-[3px] border-b-purple-400 text-black'
              }`}
              onClick={() => navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={`font-semibold py-3 cursor-pointer ${
                pathMatchRoute('/sign-in') &&
                'border-b-[3px]  border-b-purple-400 text-black'
              }`}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
