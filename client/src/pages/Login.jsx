import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Paper,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginContainer = styled("div")(({ theme }) => ({
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

const LoginCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1a2b47",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
}));

const LoginHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#00e5ff",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const UserIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: "#2a3c5a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
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
  "& .MuiInputAdornment-root": {
    color: "#8b9dc3",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);
      if (!result.success) {
        toast.error(result.message || "Login failed", {
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
        toast.success("Login successful! Redirecting...", {
          position: "top-center",
          autoClose: 2000,
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
    <>
      {/* Toast Container */}
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

      <LoginContainer>
        <LoginCard>
          <LoginHeader>
            <Typography variant="h5" fontWeight="bold">
              SIGN IN
            </Typography>
          </LoginHeader>

          <LoginForm>
            <UserIcon>
              <PersonOutlineIcon sx={{ fontSize: 40, color: "#8b9dc3" }} />
            </UserIcon>

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
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: "#00e5ff",
                        "&.Mui-checked": {
                          color: "#00e5ff",
                        },
                      }}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: "#00e5ff", fontSize: "0.8rem" }}
                    >
                      Remember me
                    </Typography>
                  }
                />

                <Link
                  href="#"
                  sx={{
                    color: "#00e5ff",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Forgot your password?
                </Link>
              </Box>

              <LoginButton type="submit" fullWidth variant="contained">
                LOGIN
              </LoginButton>

              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: "#8b9dc3" }}>
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    sx={{
                      color: "#00e5ff",
                      textDecoration: "none",
                      fontWeight: "bold",
                      ml: 0.5,
                    }}
                  >
                    Register
                  </Link>
                </Typography>
              </Box>
            </form>
          </LoginForm>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default Login;
