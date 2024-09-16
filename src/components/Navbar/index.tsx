import { List, ListItem } from "@mui/material";
import "./style.scss";
import UserPhoto from "../UserPhoto";
import { useEffect, useState } from "react";

const MenuList = () => {
  const [userLogin, setUserLogin] = useState<boolean | null>(null);
  const menus = [
    { page: "Home", link: "/" },
    { page: "Products", link: "/products" },
    {
      page: localStorage.getItem("login") ? "Private Cabine" : "Login",
      link: "/private",
    },
  ];

  // useEffect(() => {
  //   const loginData = localStorage.getItem("loginData");
  //   if (loginData) {
  //     try {
  //       const parsedData = JSON.parse(loginData);
  //       if (parsedData?.login) {
  //         setUserLogin(true);
  //       } else {
  //         setUserLogin(false);
  //       }
  //     } catch (error) {
  //       setUserLogin(false);
  //     }
  //   } else {
  //     setUserLogin(false);
  //   }
  // }, []);

  return (
    <div className="navbar">
      <List className="menu-list">
        {menus.map((listItem, idx) => (
          <ListItem className="menu-item" key={idx}>
            <a href={listItem.link}>{listItem.page}</a>
          </ListItem>
        ))}
        <div className="navbar-user-image">
          {localStorage.getItem("login") && (
            <UserPhoto className="navbar-user-image" />
          )}
        </div>
      </List>
    </div>
  );
};

export default MenuList;
