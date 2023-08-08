import spinner from '../assets/spinner.svg';

export default function Spinner() {
  return (
    <>
      <div className="flex justify-center items-center bg-black bg-opacity-40 fixed inset-0 z-50">
        <div>
          <img src={spinner} alt="loading" />
        </div>
      </div>
    </>
  );
}
