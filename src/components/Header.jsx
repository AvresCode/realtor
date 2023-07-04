export default function Header() {
  return (
    <div className="bg-slate-100 border-b shadow-md sticky top-0 z-50">
      <header className="flex justify-between items-center  px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="./realestate.png"
            alt="home"
            className=" h-20 cursor-pointer rounded-md"
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li>Home</li>
            <li>Offers</li>
            <li>Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
