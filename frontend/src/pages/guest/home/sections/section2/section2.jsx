import "./section2.css";
import { IoLocationSharp } from "react-icons/io5";
import { RiPinDistanceFill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";

export default function Section2() {
  return (
    <div className="section-2">
      <div className="search-bar center">
        <div className="search-filters center">
          <div className="location center">
            <div className="icon">
              <IoLocationSharp />
            </div>
            <div className="main center">
              <p>Location</p>
              <input type="text" placeholder="Where are you going?" />
            </div>
          </div>
          <div className="distance center">
            <div className="icon">
              <RiPinDistanceFill />
            </div>
            <div className="main center">
              <p>Distance</p>
              <input type="text" placeholder="Distance km" />
            </div>
          </div>
          <div className="people center">
            <div className="icon">
              <IoPeopleSharp />
            </div>
            <div className="main center">
              <p>Max people</p>
              <input type="text" placeholder="0" />
            </div>
          </div>
        </div>
        <div className="search-action"></div>
      </div>
    </div>
  );
}
