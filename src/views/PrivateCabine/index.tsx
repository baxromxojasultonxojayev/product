import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "src/views/PrivateCabine/UserProfile";
import MenuList from "src/components/Navbar";
import FormInput from "src/components/FormElements/FormInput";
import { Box } from "@mui/material";
import Button from "src/components/FormElements/Button";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

interface FormData {
  email: string;
  password: string;
}

const PrivateCabine = () => {
  const navigate = useNavigate();
  const [userLogin, setUSerLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Email validation
    if (!userLogin.email) {
      newErrors.email = "Pochtangizni kiriting.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLogin.email) ||
      userLogin.email !== "test@gmail.com"
    ) {
      newErrors.email = "Pochta xato kiritildi.";
    }

    // Password validation
    if (!userLogin.password) {
      newErrors.password = "Parolingizni kiriting.";
    } else if (userLogin.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgi bo'lishi kerak.";
    } else if (userLogin.password !== "test1234") {
      newErrors.password = "Parol xato kiritildi.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUSerLogin((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          email: userLogin.email,
          password: userLogin.password,
        })
      );
      localStorage.setItem("login", "true");
      navigate("/");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MenuList />

      {localStorage.getItem("login") ? (
        <UserProfile />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <div>
              <FormInput
                name="email"
                error={errors}
                label="Email:"
                type="email"
                value={userLogin.email}
                onChange={handleChange}
                onBlur={validate}
              />
              {errors.email && (
                <p style={{ color: "red", padding: 0, margin: 0 }}>
                  {errors.email}
                </p>
              )}
            </div>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <div>
              <FormInput
                name="password"
                error={errors}
                label="Parol:"
                type="password"
                value={userLogin.password}
                onChange={handleChange}
                onBlur={validate}
              />
              {errors.password && (
                <p style={{ color: "red", padding: 0, margin: 0 }}>
                  {errors.password}
                </p>
              )}
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
            className="action-buttons"
          >
            <Button type="submit" mode={"save"} />
          </Box>
        </form>
      )}
    </QueryClientProvider>
  );
};

export default PrivateCabine;
