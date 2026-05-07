import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <MotionPaper
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          elevation={0}
          sx={{
            padding: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            background: "#ffffff",
          }}
        >
          <MotionTypography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 4,
              color: "#212b36",
            }}
          >
            Sign in to LuxeCart
          </MotionTypography>

          {error && (
            <MotionTypography
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              color="error"
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: "#fff5f5",
                width: "100%",
                textAlign: "center",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </MotionTypography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "#dfe3e8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#919eab",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#212b36",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#637381",
                  "&.Mui-focused": {
                    color: "#212b36",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "#dfe3e8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#919eab",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#212b36",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#637381",
                  "&.Mui-focused": {
                    color: "#212b36",
                  },
                },
              }}
            />
            <MotionButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mb: 3,
                borderRadius: 1,
                fontSize: "0.875rem",
                textTransform: "none",
                backgroundColor: "#212b36",
                "&:hover": {
                  backgroundColor: "#161b22",
                },
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Sign in
            </MotionButton>

            <Box sx={{ textAlign: "center" }}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{
                  color: "#212b36",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot your password?
              </Link>
            </Box>

            <Divider sx={{ my: 3, borderColor: "#dfe3e8" }}>
              <Typography variant="body2" sx={{ color: "#637381", px: 1 }}>
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#637381", mb: 1 }}>
                Don't have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                sx={{
                  color: "#212b36",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Create account
              </Link>
            </Box>
          </Box>
        </MotionPaper>
      </Container>
    </MotionBox>
  );
};

export default Login;
