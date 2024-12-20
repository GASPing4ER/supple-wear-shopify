const BackgroundVideo = () => {
  return (
    <main className="h-screen relative">
      <video
        src="/videos/hero.mp4"
        className="object-cover w-full h-full"
        autoPlay
        loop
        muted
      />
    </main>
  );
};

export default BackgroundVideo;
