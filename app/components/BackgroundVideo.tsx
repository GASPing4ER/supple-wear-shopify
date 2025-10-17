import {Button} from './Button';

const BackgroundVideo = () => {
  return (
    <main className="h-[calc(100vh-60px)] relative">
      <video
        src="/videos/drop2.mp4"
        className="object-cover w-full h-full block"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="philosopher absolute text-white z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-bold text-center flex flex-col items-center gap-4">
        <h1>
          SUPPLE DROP II. Ultra-soft. Featherlight. Second skin. Pre-order now.
        </h1>
        <a href="/collections/supple-drop-ii" className="text-4xl sm:text-6xl">
          LIVE NOW
        </a>
        {/* <Countdown /> */}
        <Button className="w-fit text-2xl">PRE-ORDER NOW</Button>
      </div>
      {/* <img
        src="/images/hero.webp"
        alt="hero"
        className="h-full w-full object-cover md:hidden"
      /> */}
      {/* <h1 className="philosopher absolute text-white z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl lg:hidden font-bold text-center">
        Welcome to Supple
      </h1> */}
    </main>
  );
};

export default BackgroundVideo;
