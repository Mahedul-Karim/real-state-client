import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useGlobal } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getData } from "../../util/api";
import { useFavourites } from "../hooks/useFavourites";
import { useBookings } from "../hooks/useBookings";

function Layout() {
  const { userDetails, setUserDetails } = useGlobal();


  useFavourites();
  useBookings();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "john@gmail.com" }),
  };

  const { data} = useQuery("loggedIn", () =>
    getData("user/login", options)
  );

  const user=data?.user;
  const token=data?.token;
  

  useEffect(()=>{
    setUserDetails(prev=>({...prev,user,token,isLoggedIn:true}))
  },[data?.token]);

  // const { getAccessTokenWithPopup, isAuthenticated } = useAuth0();

  // useEffect(() => {
  //   async function getToken() {
  //     const res = await getAccessTokenWithPopup({
  //       authorizationParams: "http://localhost:8000",
  //       scope: "openid profile email",
  //     });
  //     console.log(res);
  //   }
  //   getToken();
  // }, [isAuthenticated]);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
