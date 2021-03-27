
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
      <video width="250" height="180" controls poster={(`${baseUrl}/video/${encodeURIComponent(nasa_id)}/${encodeURIComponent(nasa_id)}~thumb.jpg`)}>
        <source src={`${baseUrl}/video/${nasa_id}/${nasa_id}~medium.mp4`} type="video/mp4" />
          Your browser does not support the video element.
      </video>
    )
  }

  return (
    <audio controls>
      <source src={`${baseUrl}/audio/${nasa_id}/${nasa_id}~128k.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
  )
}