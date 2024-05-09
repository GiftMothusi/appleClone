import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

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

  const [loadedData, setLoadedData] = useState([]);

  {
    /**Destructure our state variables so we don't have to keep referencing them with the .dot referencing operator */
  }
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  //This useEffect hook mainly deals with the playing of the video

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, isPlaying, videoId, loadedData]);

  useEffect(() => {
    //first figure out where are we in our video playing journey
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        //bare in mind we can also call methods as props to animate, its not limuted to props such as opacity,z,x,and y parameters
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
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
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[index] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              {/**Sliding Carousel*/}
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
      {/**Sliding Carousel Button */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 rounded-full">
          {videoRef.current.map((_, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="h-3 w-3 bg-gray-200 mx-2 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[index] = el)}
              />
            </span>
          ))}
        </div>
        {/**Reset/Pause button next to carousel slider button */}
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
