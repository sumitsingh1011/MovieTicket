import React, { useEffect, useState } from 'react';

const Nowshowing = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000); // reset after 1s
    }, 1500); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <p className={`${animate ? 'animate-bounce-custom' : ''}`} id='bounce'>
          NOW Showing
        </p>
      </div>

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

export default Nowshowing;
  