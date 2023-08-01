import { toast } from "react-toastify";
import Search from "../util/Search";
import { useProperties } from "../components/hooks/useProperties"; 
import "../components/properties/Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../components/PropertyCard";
import { useState } from "react";
import { useGlobal } from "../components/context/context";

function BookingsPage() {
  const { data, isLoading, isError, refetch } = useProperties();

  const [filter, setFilter] = useState("");

  const {
    userDetails: { bookings },
  } = useGlobal();

  const allBookings = bookings?.map((book) => book.residency);

  if (isError) {
    return toast.error(isError.message);
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "70vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <Search filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {data?.place
            ?.filter((prop) => allBookings?.includes(prop._id))
            .filter(
              (prop) =>
                prop.title.toLowerCase().includes(filter?.toLowerCase()) ||
                prop.city.toLowerCase().includes(filter?.toLowerCase())
            )
            .map((d) => (
              <PropertyCard d={d} key={d._id} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default BookingsPage;
