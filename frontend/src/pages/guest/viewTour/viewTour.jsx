import env from "react-dotenv";
import "./viewTour.css";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import userIcon from "@/assets/media/user.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app from "@/feathers";
import { useSelector } from "react-redux";

export default function ViewTour() {

  const navigate = useNavigate()
  const user_id = useSelector((state) => state.user.userData._id);
  const { tourId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await app.service("tours").get(tourId);
        // console.log("response", response);
        setData(response);
        setBookingData({
          tourId,
          fullName: "",
          phoneNumber: "",
          tourDate: "" + Date.now(),
          bookingDate: "" + Date.now(),
          pricePerPerson: "" + response.price,
          numOfGuests: "0",
          serviceCharge: "10", //Service charge constant
          totalPaid: "10",
        });
      } catch (error) {
        console.log(">>", error);
        return;
      }
    })();
  }, []);

  const [bookingData, setBookingData] = useState();

  function handleInputChange(e) {
    setBookingData((prev) => {
      return {
        ...prev,
        [e.target.name]: " " + e.target.value,
      };
    });
  }

  async function makeBooking() {
    try {

      let constructedData = {
        ...bookingData,
        userId: user_id,
        bookingDate: "" + Date.now(),
        totalPaid:
          "" +
          (parseInt(data.price * (bookingData.numOfGuests || 0)) +
            parseInt(bookingData.serviceCharge)),
      };

      const response = await app.service("bookings").create(constructedData);

      navigate("/booking-success")

    } catch (err) {
      window.alert(err.message);
      console.log(err);
    }
  }

  if (data) {
    return (
      <div className="view-tour">
        <div className="main">
          <div className="image">
            <img
              src={process.env.REACT_APP_SERVER_URL + data.photo}
              alt="tour image"
            />
          </div>
          <div className="description">
            <div className="set-1">
              <h1>Westminister Bridge</h1>
            </div>
            <div className="set-2">
              <div className="icon">
                <FaStar />
              </div>
              {data.avgRating} ( {data.reviews.length} ratings )
            </div>
            <div className="set-3">
              <div className="location">
                <div className="icon">
                  <IoLocationOutline />
                </div>
                <div className="description">{data.city}</div>
              </div>
              <div className="price">
                <div className="icon">
                  <LuCircleDollarSign />
                </div>
                <div className="description">${data.price}/per person</div>
              </div>
              <div className="people">
                <div className="icon">
                  <IoPeopleOutline />
                </div>
                <div className="description">{data.maxGroupSize} people</div>
              </div>
            </div>
            <h3 className="set-4">Description</h3>
            <p className="set-5">{data.desc}</p>
          </div>
          <div className="reviews">
            <h1 className="set-1">Reviews({data.reviews.length} reviews)</h1>
            <div className="set-2">
              <div className="star-5">
                5{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div className="star-4">
                4{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div className="star-3 star-selected">
                3{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div className="star-2">
                2{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
              <div className="star-1">
                1{" "}
                <span className="icon">
                  <FaStar />
                </span>
              </div>
            </div>
            <div className="set-3">
              <input type="text" placeholder="Share your thoughts..." />
              <div className="btn">Submit</div>
            </div>
            <div className="set-4 reviews">
              {data.reviews.map((review) => {
                return (
                  <div className="review" key={review._id}>
                    <div className="left">
                      <img src={userIcon} alt="User icon" />
                    </div>
                    <div className="center">
                      <div className="username">
                        <b>{review.username}</b>
                      </div>
                      <div className="review-posted-date">
                        {review.postedTime}
                      </div>
                      <div className="review">{review.text}</div>
                    </div>
                    <div className="right">
                      <span>{review.rating}</span>
                      <div className="icon">
                        <FaStar />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="booking">
          <div className="set-1">
            <div className="left">
              <span className="highlight">${data.price}</span>
              <span className="light-text">/ per person</span>
            </div>
            <div className="right">
              <FaStar /> {data.avgRating}({data.reviews.length})
            </div>
          </div>

          <div className="set-2">
            <h3>Information</h3>
            <div className="form">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone"
                onChange={handleInputChange}
              />
              <div>
                <input
                  type="date"
                  name="tourDate"
                  placeholder="dd/mm/yyyy"
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="numOfGuests"
                  placeholder="Number of Guests"
                  onChange={handleInputChange}
                  min={0}
                  max={data.maxGroupSize}
                />
              </div>
            </div>
            <div className="billing">
              <div className="set-1">
                <div className="left">
                  ${data.price} x {bookingData.numOfGuests || 0} person
                </div>
                <div className="right">
                  ${data.price * (bookingData.numOfGuests || 0)}
                </div>
              </div>
              <div className="set-2">
                <div className="left">Service Charge</div>
                <div className="right">${bookingData.serviceCharge}</div>
              </div>
              <div className="set-3">
                <div className="left">
                  <b>Total</b>
                </div>
                <div className="right">
                  <b>
                    $
                    {parseInt(data.price * (bookingData.numOfGuests || 0)) +
                      parseInt(bookingData.serviceCharge)}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="btn set-3" onClick={makeBooking}>
            Book Now!
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}
