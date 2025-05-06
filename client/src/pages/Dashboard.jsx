import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const rows = [
    {
      id: 1,
      name: "Michael Holz",
      dateCreated: "04/10/2013",
      role: "Admin",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Paula Wilson",
      dateCreated: "05/08/2014",
      role: "Publisher",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      dateCreated: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Mary Saveley",
      dateCreated: "06/09/2016",
      role: "Reviewer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Martin Sommer",
      dateCreated: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Mary Saveley",
      dateCreated: "06/09/2016",
      role: "Reviewer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Martin Sommer",
      dateCreated: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalEntries = rows.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/image.avif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            px: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "#bbdefb",
              p: 2,
              borderRadius: "8px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              maxWidth: "870px",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Welcome, {user?.name || "User"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Button variant="contained" color="primary" fullWidth={true}>
                Create+
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                fullWidth={true}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <TableContainer
            component={Paper}
            sx={{ width: "100%", maxWidth: 900 }}
          >
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#e3f2fd",
                p: 2,
                fontWeight: "bold",
              }}
            >
              Product Inventory
            </Typography>
            <Table aria-label="dashboard table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#bbdefb" }}>
                  {[
                    "ID",
                    "Avatar",
                    "Name",
                    "Date Created",
                    "Role",
                    "Status",
                  ].map((head, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid #ccc",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#f1f8ff",
                      },
                    }}
                  >
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      <Avatar src={row.avatar} alt={row.name} />
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      {row.dateCreated}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      {row.role}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 870,
              borderTop: "1px solid #e0e0e0",
              px: 2,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              bgcolor: "#fff",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Showing {paginatedRows.length} of {totalEntries} entries
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                size="medium"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      bgcolor: page === currentPage ? "#2196f3" : "inherit",
                      color: page === currentPage ? "#fff" : "inherit",
                    }}
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="outlined"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
