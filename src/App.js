import { useState, useEffect } from "react";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [urlMap, setUrlMap] = useState("");
  const url =
    "https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json";

  const getCoordinates = async () => {
    //   const requestOptions = {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: { "Content-Type": "application/json" }

    // }
    const response = await fetch(url);
    const data = await response.json();
    const iss_long = data.iss_position.longitude;
    const iss_lati = data.iss_position.latitude;

    setLatitude(data.iss_position.latitude);
    setLongitude(data.iss_position.longitude);
    setInterval(() => {
      setUrlMap(
        `https://frame.mapy.cz/zakladni?x=${iss_long}&y=${iss_lati}&z=1&source=coor&&id=${iss_long}%2C${iss_lati}`
      );
    }, 5000);
  };
  useEffect(() => {
    getCoordinates();
  }, [urlMap]);

  return (
    <div>
      <h1>Zeměpisná šířka: {latitude}</h1>
      <h1>Zeměpisná délka: {longitude}</h1>

      <iframe title="ttest" src={urlMap} width="800" height="600"></iframe>
    </div>
  );
};

export default App;
