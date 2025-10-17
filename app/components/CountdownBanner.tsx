import {useEffect, useState} from 'react';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-10-17T10:00:00Z'); // 12:00 CEST = 10:00 UTC

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('Now available!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed font-medium top-0 left-0 w-full bg-[#F5F5DC] h-[80px] lg:h-[60px] text-black text-center text-xs sm:text-sm md:text-base flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 z-10">
      Shipping starts 24.10.2025
    </div>
  );
};

export default CountdownBanner;
