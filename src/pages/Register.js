import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link,
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer", // Default role
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
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
            Create your LuxeCart account
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
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
              <FormLabel
                component="legend"
                sx={{
                  color: "#637381",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Account Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                    color: "#212b36",
                  },
                  "& .MuiRadio-root": {
                    color: "#dfe3e8",
                    "&.Mui-checked": {
                      color: "#212b36",
                    },
                  },
                }}
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
            </FormControl>
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
              Create account
            </MotionButton>

            <Divider sx={{ my: 3, borderColor: "#dfe3e8" }}>
              <Typography variant="body2" sx={{ color: "#637381", px: 1 }}>
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#637381", mb: 1 }}>
                Already have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/login"
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
                Sign in
              </Link>
            </Box>
          </Box>
        </MotionPaper>
      </Container>
    </MotionBox>
  );
};

export default Register;
