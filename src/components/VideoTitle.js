import React from "react";

const VideoTitle = ({title , overview}) => {
    return (
        <div className="w-screen aspect-video pt-56 px-9 absolute text-white bg-gradient-to-r from-black ">
            <h1 className="font-bold text-6xl">{title}</h1>
            <p className="w-1/3 text-sm px-3 pt-2">{overview}</p>
            <div className="pt-2 px-5">
                <button className="bg-white text-black p-3 px-10 rounded-md text-xl hover:bg-opacity-80"> ▶︎Play</button>
                <button className="m-2 bg-gray-500 text-white p-3 px-10 rounded-md text-xl bg-opacity-50 hover:bg-opacity-80">🛈More info</button>
            </div>
           
        </div>
    );
};
export default VideoTitle;
