import { useQuery } from "react-query";
import { getData } from "../../util/api";

export function useProperties() {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    () => getData("residency"),
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
