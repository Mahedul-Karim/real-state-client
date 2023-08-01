import { Avatar, Menu } from "@mantine/core";
import { useGlobal } from "../../context/context";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ user, logout }) {
  const { setUserDetails } = useGlobal();

  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("/favourites")}>
          Favourites
        </Menu.Item>

        <Menu.Item onClick={() => navigate("/bookings")}>Bookings</Menu.Item>

        <Menu.Item
          onClick={() =>
            setUserDetails({
              user: null,
              token: null,
              favourites: [],
              bookings: [],
              isLoggedIn: false,
            })
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;
