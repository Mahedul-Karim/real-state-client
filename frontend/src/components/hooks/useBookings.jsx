import { useEffect, useRef } from "react";
import { useGlobal } from "../context/context";
import { getData } from "../../util/api";
import { useQuery } from "react-query";

export function useBookings() {
  const {
    userDetails: { token, user },
    setUserDetails,
  } = useGlobal();

  const queryRef = useRef();
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getData("user/bookings", options),
    onSuccess: (data) =>
      setUserDetails((prev) => ({
        ...prev,
        bookings: data?.bookedPlace?.bookedVisits,
      })),
    enabled: user !== null,
    staleTime: 60000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);
}
