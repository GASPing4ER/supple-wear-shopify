import Countdown from './Countdown';

const BackgroundVideo = () => {
  return (
    <main className="h-[calc(100vh-60px)] relative">
      <video
        src="/videos/essentia.mp4"
        className="object-cover w-full h-full block"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="philosopher absolute text-white z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-bold text-center">
        <h1>ESSENTIA - AUGUST LINE</h1>
        <Countdown />
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
