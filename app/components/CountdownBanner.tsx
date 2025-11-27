import {useEffect, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';

import type {RootLoader} from '~/root';
import {DEFAULT_LOCALE} from '~/lib/utils';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const rootData = useRouteLoaderData<RootLoader>('root');
  const language =
    rootData?.selectedLocale?.language ?? DEFAULT_LOCALE.language;

  const bannerMessages: Record<string, string> = {
    EN: 'Discount code BF30 for old collections and BF15 for new collections.',
    ES: 'Codigo de descuento BF30 para colecciones antiguas y BF15 para colecciones nuevas.',
    SL: 'Koda za popust BF30 za stare kolekcije in BF15 za nove kolekcije.',
  };

  const message = bannerMessages[language] ?? bannerMessages.EN;

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
    <div className="sticky top-0 left-0 z-50 w-full h-[60px] font-medium bg-[#F5F5DC] text-black text-center text-xs sm:text-sm md:text-base flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 uppercase">
      {message}
    </div>
  );
};

export default CountdownBanner;
