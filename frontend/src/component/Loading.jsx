import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000); 
    }, 1100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className='flex justify-center items-center h-[80vh]'>
        {/* Spinning circle */}
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'></div>

        {/* Bouncing LOADING text */}
        <p className={`mx-[10px] px-6 ${animate ? 'animate-bounce-custom' : ''}`} id='bounce'>
          LOADING
        </p>
      </div>

      {/* Bounce animation style */}
      <style>
        {`
          @keyframes bounce-custom {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }

          .animate-bounce-custom {
            animation: bounce-custom 1s ease;
          }
        `}
      </style>
    </>
  );
};

export default Loading;
