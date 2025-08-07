import {useEffect, useState} from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-08-08T10:00:00Z'); // 12:00 CEST = 10:00 UTC

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

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0',
        )}:${String(seconds).padStart(2, '0')}`,
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-4xl sm:text-6xl">{timeLeft}</p>;
};

export default Countdown;
