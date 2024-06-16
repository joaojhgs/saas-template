import React from 'react';

import LoginComponent from '@/client/components/auth/LoginComponent';

export default function LoginPage() {
  return (
    <>
      <div className="bg-purple-900 to-purple-800 absolute inset-y-0 left-0 size-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 leading-5"></div>
      <div className="relative mt-12 justify-center  rounded-3xl bg-transparent shadow-xl sm:flex sm:flex-row">
        <div className="z-10 flex  flex-col self-center sm:max-w-4xl lg:px-14  xl:max-w-md">
          <div className="hidden flex-col self-start text-gray-300  lg:flex">
            <h1 className="my-3 text-4xl font-semibold">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <LoginComponent />
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
