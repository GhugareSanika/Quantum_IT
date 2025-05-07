import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  InputAdornment,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, Mail, Lock, CalendarToday } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('/image6.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const RegisterCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1a2b47",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
}));

const RegisterHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#00e5ff",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const RegisterForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2a3c5a",
    color: "#fff",
    "& fieldset": {
      borderColor: "#3f4c6b",
    },
    "&:hover fieldset": {
      borderColor: "#00e5ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00e5ff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#8b9dc3",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00e5ff",
  },
  "& .MuiInputAdornment-root": {
    color: "#8b9dc3",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#8b9dc3",
    opacity: 1,
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00e5ff",
  color: "#1a2b47",
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#00b8d4",
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!dob) {
      setError("Date of birth is required");
      toast.error("Date of birth is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const result = await register(name, dob, email, password);
      if (!result.success) {
        toast.error(result.message || "Registration failed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Registration successful! Redirecting...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RegisterContainer>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />

        <RegisterCard>
          <RegisterHeader>
            <Typography variant="h5" fontWeight="bold">
              REGISTER
            </Typography>
          </RegisterHeader>

          <RegisterForm>
            {error && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                sx={{ mb: 2 }}
              >
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />

              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => setDob(newValue)}
                renderInput={(params) => (
                  <StyledTextField
                    fullWidth
                    {...params}
                    required
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "#fff",
                      },
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <RegisterButton type="submit" fullWidth variant="contained">
                REGISTER
              </RegisterButton>

              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: "#8b9dc3" }}>
                  Already have an account?{" "}
                  <Link
                    href="/"
                    sx={{
                      color: "#00e5ff",
                      textDecoration: "none",
                      fontWeight: "bold",
                      ml: 0.5,
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </form>
          </RegisterForm>
        </RegisterCard>
      </RegisterContainer>
    </LocalizationProvider>
  );
};

export default Register;
