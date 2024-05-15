import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
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

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  {
    /**Destructure our state variables so we don't have to keep referencing them with the .dot referencing operator */
  }
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  //Adding animations to our video carousel

  useGSAP(() => {
    //animation to return the video duration slider to its initial state once each video is done playing on transition
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    //first figure out where are we in our video playing journey
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      //animate the progress of the video
      let anim = gsap.to(span[videoId], {
        //bare in mind we can also call methods as props to animate, its not limuted to props such as opacity,z,x,and y parameters
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          //This method sets The sliding duration effect of the carousel to the length of the video playing
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: "12px" });

            gsap.to(span[videoId], { backgroundColor: "#afafaf" });
          }
        },
      });
      if (videoId === 0) {
        //Note restart is our utility function
        anim.restart();
      }
      //Now we modify how long our animation should last, this effect will show the carousel slider running as video is playing
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      //gsap ticker is used to update the progress bar
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);

  {
    /**recall hook everytime videoId changes or the startPlay variable changes */
  }

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

  //Method to handle the button next to the carousel slider, play,rest or pause

  const handleProcess = (type, index) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: index + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;

      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetadata = (index, e) =>
    setLoadedData((prevVideo) => [...prevVideo, e]);

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
                  onEnded={() =>
                    index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last")
                  }
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
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
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
