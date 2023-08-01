import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { useGlobal } from "../components/context/context";
import { toast } from "react-toastify";
import { getData } from "./api";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");

  const {
    userDetails: { user, isLoggedIn, favourites, token },
    setUserDetails,
  } = useGlobal();

  const options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const updateFavourites = (id, favourites) => {
    if (favourites.includes(id)) {
      return favourites.filter((resId) => resId !== id);
    } else {
      return [...favourites, id];
    }
  };

  const checkFavourites = (id, favourites) => {
    return favourites?.includes(id) ? "#fa3e5f" : "white";
  };

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  const successLike = function () {
    setUserDetails((prev) => ({
      ...prev,
      favourites: updateFavourites(id, prev.favourites),
    }));
  };

  const { mutate } = useMutation({
    mutationFn: () => getData(`user/favourite/${id}`, options),
    onSuccess: successLike,
  });

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      return toast.error("Login first to set favorites");
    }
    mutate();
    setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
  };

  return <AiFillHeart size={24} color={heartColor} onClick={handleLike} />;
};

export default Heart;
