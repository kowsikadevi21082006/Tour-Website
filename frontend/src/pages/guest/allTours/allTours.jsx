import "./allTours.css";
import tourVideo from "@/assets/media/bg-video.mp4";
import Section2 from "../home/sections/section2/section2";
import img from "@/assets/media/tour-img01.jpg";
import Card from "@/components/card/card";
import { tourData } from "../../../sampleData";
import { useEffect, useState } from "react";
import app from "@/feathers";

export default function AllTours() {
  const data = tourData;

  const [allTourData, setAllTourData] = useState([])

  async function getAllTours(){
    try {
      const response = await app.service("tours").find();
      console.log("response", response);
      setAllTourData(response.data)
    } catch (error) {
      console.log(">>",error)
      return
    }
  }

  useEffect(() => {
    getAllTours()
  }, []);

  return (
    <div className="all-tours">
      <div className="video-card">
        <video src={tourVideo} autoPlay muted loop></video>
        <h1>Explore All Tour Packages</h1>
      </div>
      <div className="all-tours-content">
        <Section2 />
        <div className="cards">
          {allTourData.map( (data)=> <Card key={data.id} data={data} /> )}
        </div>
      </div>
    </div>
  );
}
