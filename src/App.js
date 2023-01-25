import { useState, useEffect } from "react";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [urlMap, setUrlMap] = useState("");
  const url = "https://api.wheretheiss.at/v1/satellites/25544";

  const getCoordinates = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const iss_long = data.longitude;
    const iss_lati = data.latitude;

    setLatitude(data.latitude);
    setLongitude(data.longitude);

    setUrlMap(`https://frame.mapy.cz/zakladni?x=${iss_long}&y=${iss_lati}&z=3&source=coor&&id=${iss_long}%2C${iss_lati}`);
  };
  useEffect(() => {
    getCoordinates();
  });

  return (
    <div>
      <h1>Pozice ISS</h1>
      <h2>Zeměpisná šířka: {latitude}</h2>
      <h2>Zeměpisná délka: {longitude}</h2>

      <iframe title="ttest" src={urlMap} width="800" height="600"></iframe>
    </div>
  );
};

export default App;
