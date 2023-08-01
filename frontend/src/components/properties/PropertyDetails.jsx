import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./PropertyDetails.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getData } from "../../util/api";
import Map from "../Map/Map";
import BookingModal from "../booking/BookingModal";
import { useGlobal } from "../context/context";
import { toast } from "react-toastify";
import { Button } from "@mantine/core";
import Heart from "../../util/Heart";

const PropertyDetails = () => {
  const [opened, setOpened] = useState(false);

  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["singleProperty", id], () =>
    getData(`residency/${id}`)
  );

  const {
    userDetails: {
      user,
      isLoggedIn,
      bookings,
      token,
    },
    setUserDetails,
  } = useGlobal();

  const modalOpen = function () {
    if (!isLoggedIn) {
      return toast.error("Login first to book a place");
    }
    setOpened(true);
  };

  const options = {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
  };

  const onCancelingSuccess = function () {
    setUserDetails((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((book) => book.residency !== id),
    }));
    toast.success("Booking canceled successfully");
  };

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => getData(`user/book/${id}`, options),
    onSuccess: onCancelingSuccess,
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={id}/>
        </div>

        <img src={data?.place?.image} alt="home image" />

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.place?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.place?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.place?.facilities?.bathrooms} Bathrooms</span>
              </div>

              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.place?.facilities?.parking} Parking</span>
              </div>

              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.place?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.place?.description}
            </span>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.place?.address} {data?.place?.city}{" "}
                {data?.place?.country}
              </span>
            </div>
            {bookings?.find((book) => book.residency === id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {
                    bookings?.filter((booking) => booking?.residency === id)[0]
                      .date
                  }
                </span>
              </>
            ) : (
              <button className="button" onClick={modalOpen}>
                Book your visit
              </button>
            )}
          </div>

          <BookingModal
            opened={opened}
            setOpened={setOpened}
            propertyId={id}
            email={user?.email}
          />

          {/* right side */}
          <div className="map">
            <Map
              address={`${data?.place?.address},${data?.place?.city},${data?.place?.country}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
