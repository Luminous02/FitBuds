import React, { useState, useRef, useEffect} from "react";
import "./Exercises.css";

const Exercises = () => {
    const videoData = [
        { src: '/videos/workout1.mp4', title: '01. video title goes here' },
        { src: '/videos/workout2.mp4', title: '02. video title goes here' },
        { src: '/videos/workout3.mp4', title: '03. video title goes here' },
        { src: '/videos/workout4.mp4', title: '04. video title goes here' },
        { src: '/videos/workout5.mp4', title: '05. video title goes here' },
        { src: '/videos/workout6.mp4', title: '06. video title goes here' },
        { src: '/videos/workout7.mp4', title: '07. video title goes here' },
        { src: '/videos/workout8.mp4', title: '08. video title goes here' },
        { src: '/videos/workout9.mp4', title: '09. video title goes here' },
        { src: '/videos/workout10.mp4', title: '10. video title goes here' },
      ];

    const [mainVideoSrc, setMainVideoSrc] = useState(videoData[0].src);
    const [mainVideoTitle, setMainVideoTitle] = useState(videoData[0].title);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    const handleVideoClick = (index) => {
        setMainVideoSrc(videoData[index].src);
        setMainVideoTitle(videoData[index].title);
        setActiveVideoIndex(index);
    };

    return (
        <>
        <h3 className="heading">Video Gallery</h3>
        <div className="videoContainer">
            <div className="main-video">
                <div className="video">
                    <video src={mainVideoSrc} controls muted autoPlay></video>
                    <h3 className="title">{mainVideoTitle}</h3>
                </div>
            </div>
            <div className="video-list">
                {videoData.map((video, index) => (
                    <div
                       key={index}
                       className={`vid ${activeVideoIndex === index ? 'active' : ''}`}
                       onClick={() => handleVideoClick(index)}
                    >
                       <video src={video.src} muted></video>
                       <h3 className="title">{video.title}</h3>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Exercises;