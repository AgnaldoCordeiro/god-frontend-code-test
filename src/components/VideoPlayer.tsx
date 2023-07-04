import React from "react";

interface VideoPlayerProps {
  url?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <video autoPlay loop muted className="video">
      <source src={url} type="video/mp4" />
      Seu navegador não suporta vídeos HTML5.
    </video>
  );
};

export default VideoPlayer;
