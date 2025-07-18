import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Divider,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Switch,
  Stack
} from "@mui/material";
import { Add, Edit, Delete, Person, AdminPanelSettings } from "@mui/icons-material";
import Sidebar from "../Sidebar";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
} from "../../api/staffApi";
import {
  getStaffPermissions,
  setStaffPermissions,
} from "../../api/permissionApi";

const staffSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const AddEditStaff = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("staff");
  const [openModal, setOpenModal] = useState(false);
  const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPermissions, setCurrentPermissions] = useState({
    canCreateStudent: false,
    canViewStudent: false,
    canUpdateStudent: false,
    canDeleteStudent: false,
  });
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [loadingPermissions, setLoadingPermissions] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchema),
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await getStaff();
      setStaffMembers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch staff");
    }
    setLoading(false);
  };

  const fetchPermissions = async (staffId) => {
    setLoadingPermissions(true);
    try {
      const response = await getStaffPermissions(staffId);
      setCurrentPermissions({
        canCreateStudent: response.permission.canCreateStudent || false,
        canViewStudent: response.permission.canReadStudent || false,
        canUpdateStudent: response.permission.canUpdateStudent || false,
        canDeleteStudent: response.permission.canDeleteStudent || false,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch permissions");
    }
    setLoadingPermissions(false);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenModal = () => {
    setEditingId(null);
    reset();
    setOpenModal(true);
  };

  const handleEdit = (staff) => {
    setEditingId(staff._id);
    reset({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      password: "",
      confirmPassword: "",
    });
    setOpenModal(true);
  };

  const handleOpenPermissionsModal = async (staffId) => {
    setSelectedStaffId(staffId);
    await fetchPermissions(staffId);
    setOpenPermissionsModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClosePermissionsModal = () => {
    setOpenPermissionsModal(false);
  };

  const handlePermissionChange = (e) => {
    setCurrentPermissions({
      ...currentPermissions,
      [e.target.name]: e.target.checked,
    });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await updateStaff(editingId, data);
      } else {
        await createStaff(data);
      }
      handleCloseModal();
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert("Failed to save staff");
    }
    setSubmitting(false);
  };

  const onSubmitPermissions = async () => {
    setSubmitting(true);
    try {
      await setStaffPermissions(selectedStaffId, currentPermissions);
      handleClosePermissionsModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save permissions");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await deleteStaff(id);
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert("Failed to delete staff");
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Person className="text-indigo-600" />
              <Typography
                variant="h6"
                component="h1"
                className="text-gray-800 font-semibold"
              >
                Staff Management
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenModal}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                bgcolor: "indigo.600",
                "&:hover": { bgcolor: "indigo.700" },
              }}
            >
              Add Staff
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Paper elevation={0} className="rounded-lg border border-gray-200">
            {loading ? (
              <Box p={4} textAlign="center">
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead className="bg-gray-50">
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staffMembers.length > 0 ? (
                      staffMembers.map((staff) => (
                        <TableRow key={staff._id} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar>{staff.name?.[0]}</Avatar>
                              {staff.name}
                            </Box>
                          </TableCell>
                          <TableCell>{staff.email}</TableCell>
                          <TableCell>{staff.phone}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Permissions">
                              <IconButton
                                onClick={() => handleOpenPermissionsModal(staff._id)}
                                color="secondary"
                              >
                                <AdminPanelSettings fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Staff">
                              <IconButton onClick={() => handleEdit(staff)}>
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Staff">
                              <IconButton
                                onClick={() => handleDelete(staff._id)}
                                color="error"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography>No staff members found</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </main>
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <DialogTitle className="bg-gray-50 border-b border-gray-200">
          <Typography variant="h6">
            {editingId ? "Edit Staff" : "Add New Staff"}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="p-6">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <Divider />
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Box>
          </DialogContent>
          <DialogActions className="bg-gray-50 border-t border-gray-200 px-6 py-4">
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                bgcolor: "indigo.600",
                "&:hover": { bgcolor: "indigo.700" },
              }}
            >
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Staff"
                  : "Add Staff"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openPermissionsModal}
        onClose={handleClosePermissionsModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <DialogTitle className="bg-gray-50 border-b border-gray-200">
          <Typography variant="h6">Manage Staff Permissions</Typography>
        </DialogTitle>
        <DialogContent className="p-6">
          {loadingPermissions ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="medium">
                Student Management Permissions
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={currentPermissions.canViewStudent}
                    onChange={handlePermissionChange}
                    name="canViewStudent"
                    color="primary"
                  />
                }
                label="Can View Students"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={currentPermissions.canCreateStudent}
                    onChange={handlePermissionChange}
                    name="canCreateStudent"
                    color="primary"
                  />
                }
                label="Can Create Students"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={currentPermissions.canUpdateStudent}
                    onChange={handlePermissionChange}
                    name="canUpdateStudent"
                    color="primary"
                  />
                }
                label="Can Update Students"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={currentPermissions.canDeleteStudent}
                    onChange={handlePermissionChange}
                    name="canDeleteStudent"
                    color="primary"
                  />
                }
                label="Can Delete Students"
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <Button
            onClick={handleClosePermissionsModal}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmitPermissions}
            variant="contained"
            disabled={submitting}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              bgcolor: "indigo.600",
              "&:hover": { bgcolor: "indigo.700" },
            }}
          >
            {submitting ? "Saving..." : "Save Permissions"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEditStaff;