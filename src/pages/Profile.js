import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          ...formData,
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      login(response.data.user);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>

          <Box sx={{ mt: 3, position: "relative" }}>
            <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="street-address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
