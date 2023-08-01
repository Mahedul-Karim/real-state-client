import { toast } from "react-toastify";
import Search from "../../util/Search";
import { useProperties } from "../hooks/useProperties";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../PropertyCard";
import { useState } from "react";

function Properties() {
  const { data, isLoading, isError, refetch } = useProperties();

  const [filter, setFilter] = useState("");

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
            ?.filter((prop) =>
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
export default Properties;
