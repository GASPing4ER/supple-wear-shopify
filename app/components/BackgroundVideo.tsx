// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/media-has-caption */

const BackgroundVideo = () => {
  return (
    <main className="h-screen relative">
      <video
        src="/videos/about.mp4"
        className="object-cover w-full h-full hidden md:block"
        autoPlay
        loop
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
