import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <section>
      <h1 className="text-center text-2xl font-bold pt-6"> Sign In </h1>
      <div className="max-w-6xl bg-slate-400 flex justify-center items-center flex-wrap py-12 px-6 mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 ">
          <form>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out border-gray-400 rounded-md"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
