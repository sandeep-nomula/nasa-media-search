import ReactPlayer from 'react-player';

const baseUrl = "https://images-assets.nasa.gov";

export const Player = (props) => {

  const { media, nasa_id } = props;

  if (media === "image") {
    return (
      <img
        style={{ height: "150px", width: "200px" }}
        alt={nasa_id}
        src={`${baseUrl}/image/${nasa_id}/${nasa_id}~thumb.jpg`}
      />);
  }

  if (media === "video") {
    return (
      <ReactPlayer
        height={150}
        width={250}
        light={(`${baseUrl}/video/${encodeURIComponent(nasa_id)}/${encodeURIComponent(nasa_id)}~thumb.jpg`)}
        url={`${baseUrl}/video/${nasa_id}/${nasa_id}~medium.mp4`}
        controls={true}
      />
    )
  }

  return (
    <ReactPlayer
      height={150}
      width={250}
      url={`${baseUrl}/audio/${nasa_id}/${nasa_id}~128k.mp3`}
      controls={true}
    />
  )
}