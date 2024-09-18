const BackgroundVideo = () => {
  return (
    <main className="h-screen relative">
      <video
        src="/videos/hero.mp4"
        className="object-cover w-full h-full hidden md:block"
        autoPlay
        loop
        muted
      />
      <img
        src="/images/hero.webp"
        alt="hero"
        className="h-full w-full object-cover md:hidden"
      />
    </main>
  );
};

export default BackgroundVideo;
