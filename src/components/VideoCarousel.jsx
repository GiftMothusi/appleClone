import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";

const VideoCarousel = () => {
  {
    /**Reference hooks for our video carousel */
  }
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: false,
    isLastVideo: false,
    isPlaying: false,
  });

  {
    /**Destructure our state variables so we don't have to keep referencing them with the .dot referencing operator */
  }
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    //first figure out where are we in our video playing journey
    const currentProgress = 0;
    let span = videoSpanRef.current;
  }, [videoId, startPlay]);

  {
    /**recall hook everytime videoId changes or the startPlay variable changes */
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video id="video" playsInline={true} preload="auto" muted>
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              {/**Sliding Carousel Button */}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((textArr) => (
                  <p key={textArr} className="md:text-xl text-xl font-medium">
                    {textArr}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCarousel;
