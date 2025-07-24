import React, { useEffect, useState } from "react";
import BookingForm from "../bookings/BookingForm";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
} from "react-icons/fa";

import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div className="bg-light py-5">
      <section className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            {isLoading ? (
              <p>Loading room information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="card shadow rounded-4 p-3">
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room photo"
                  className="img-fluid rounded mb-3"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Price per night:</th>
                      <td>${roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <th>Room Id:</th>
                      <td>{roomInfo.id}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Room Services</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <ul className="list-unstyled row row-cols-2 g-2">
                          <li><FaWifi /> Wifi</li>
                          <li><FaTv /> Netflix Premium</li>
                          <li><FaUtensils /> Breakfast</li>
                          <li><FaWineGlassAlt /> Mini bar</li>
                          <li><FaCar /> Car Service</li>
                          <li><FaParking /> Parking</li>
                          <li><FaTshirt /> Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="col-lg-8">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <RoomCarousel />
      </section>
    </div>
  );
};

export default Checkout;
