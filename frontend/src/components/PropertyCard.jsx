import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import Heart from "../util/Heart";
function PropertyCard({ d }) {
  const navigate = useNavigate();

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${d._id}`)}
    >
      <Heart id={d._id}/>
      <img src={d.image} alt="" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{d.price}</span>
      </span>
      <span className="primaryText">{d?.title?.substring(0, 15)}...</span>
      <span className="secondaryText">
        {d?.description?.substring(0, 80)}...
      </span>
    </div>
  );
}
export default PropertyCard;
