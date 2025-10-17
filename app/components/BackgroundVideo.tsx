import {Button} from './Button';

const BackgroundVideo = () => {
  return (
    <main className="h-[calc(100vh-60px)] relative">
      {/* 🎥 Video — hidden on small screens */}
      <video
        src="/videos/drop2.mp4"
        className="object-cover w-full h-full"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🖼️ Fallback image — visible only on small screens */}
      {/* <img
        src="/images/home.jpeg"
        alt="Supple Drop II"
        className="block sm:hidden object-cover w-full h-full"
      /> */}

      {/* Overlay content */}
      <div className="philosopher absolute text-white z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-bold text-center flex flex-col items-center gap-4 px-4">
        <h1>SUPPLE DROP II. Ultra-soft. Featherlight. Second skin.</h1>
        <Button to="/collections/supple-drop-ii">ORDER NOW</Button>
      </div>
    </main>
  );
};

export default BackgroundVideo;
