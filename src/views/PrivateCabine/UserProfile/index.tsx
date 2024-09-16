import { useState } from "react";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import UserPhoto from "src/components/UserPhoto";
import Button from "src/components/FormElements/Button";
import Modal from "src/components/Modal";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  bio: string;
  location: string;
};

const fetchUser = async () => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5000,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    // Clear login data from localStorage
    localStorage.removeItem("loginData");
    localStorage.removeItem("login");

    // Redirect or update state as needed
    navigate("/");
  };

  return (
    <div className="user-profile">
      {!isLoading ? (
        <div className="container">
          <div className="header-profile">
            <UserPhoto isModalOpen={isModalOpen} />
            <div className="user-name">
              <p className="name">{data?.name}</p>
              <p className="email">{data?.email}</p>
            </div>
          </div>
          <div className="profile-info">
            <div className="peson-info">
              <p className="title">Name</p>
              <p className="title-name">{data?.name}</p>
            </div>
            <div className="peson-info">
              <p className="title">Email</p>
              <p className="title-name">{data?.email}</p>
            </div>
            <div className="peson-info">
              <p className="title">BIO</p>
              <p className="title-name">{data?.bio}</p>
            </div>
            <div className="peson-info">
              <p className="title">Location</p>
              <p className="title-name">{data?.location}</p>
            </div>
          </div>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={openModal} mode={"edit"} />
            <Button onClick={handleLogout} mode={"logout"} />
          </Box>
          <Modal userData={data} isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ) : (
        <p className="loading-message">"Ma'lumotlar Yangilanmoqda"</p>
      )}
    </div>
  );
};

export default UserProfile;
