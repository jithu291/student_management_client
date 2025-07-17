import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
    AlertTitle
} from "@mui/material";
import { Add, Edit, Delete, School, Lock } from "@mui/icons-material";
import Sidebar from "../Sidebar";
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} from "../../api/studentApi";
import { getStaffPermissions } from "../../api/permissionApi";
import { useSelector } from "react-redux";

const standards = [
    "LKG", "UKG", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "10", "11", "12"
];

const studentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    guardianName: z.string().min(1, "Guardian name is required"),
    guardianPhone: z.string().min(10, "Phone must be at least 10 digits"),
    standard: z.string().min(1, "Standard is required"),
    age: z.number().min(3, "Age must be at least 3").max(18, "Age must be at most 18"),
});

const AddEditStudent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenuItem, setActiveMenuItem] = useState("students");
    const [openModal, setOpenModal] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const [permissionMessage, setPermissionMessage] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [permissions, setPermissions] = useState({
        canCreateStudent: false,
        canReadStudent: false,
        canUpdateStudent: false,
        canDeleteStudent: false,
    });
    const { user } = useSelector((state) => state.auth);
    console.log('k',user);
    
    const isStaff = user.role === 'staff';
    const userId = user.id;
    
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(studentSchema),
    });

    const fetchPermissions = async () => {
        if (isStaff) {
            try {
                const response = await getStaffPermissions(userId);
                setPermissions(response.permission);
            } catch (err) {
                console.error("Failed to fetch permissions:", err);
            }
        } else {
            setPermissions({
                canCreateStudent: true,
                canReadStudent: true,
                canUpdateStudent: true,
                canDeleteStudent: true,
            });
        }
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch students");
        }
        setLoading(false);
    };

    useEffect(() => {
        const initializeData = async () => {
            await fetchPermissions();
            if (!isStaff || permissions.canReadStudent) {
                fetchStudents();
            } else {
                setLoading(false);
            }
        };
        initializeData();
    }, []);

    useEffect(() => {
        if (permissions.canReadStudent && students.length === 0 && !loading) {
            fetchStudents();
        }
    }, [permissions]);

    const showPermissionModal = (action) => {
        const actionMessages = {
            create: "You don't have permission to add new students.",
            edit: "You don't have permission to edit student information.",
            delete: "You don't have permission to delete students.",
        };
        setPermissionMessage(actionMessages[action]);
        setOpenPermissionModal(true);
    };

    const handleOpenModal = () => {
        if (isStaff && !permissions.canCreateStudent) {
            showPermissionModal("create");
            return;
        }
        setEditingId(null);
        reset();
        setOpenModal(true);
    };

    const handleEdit = (student) => {
        if (isStaff && !permissions.canUpdateStudent) {
            showPermissionModal("edit");
            return;
        }
        setEditingId(student._id);
        reset({
            name: student.name,
            guardianName: student.guardianName,
            guardianPhone: student.guardianPhone,
            standard: student.standard,
            age: student.age,
        });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClosePermissionModal = () => {
        setOpenPermissionModal(false);
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            if (editingId) {
                await updateStudent(editingId, data);
            } else {
                await createStudent(data);
            }
            handleCloseModal();
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Failed to save student");
        }
        setSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (isStaff && !permissions.canDeleteStudent) {
            showPermissionModal("delete");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await deleteStudent(id);
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Failed to delete student");
        }
    };

    const NoPermissionView = () => (
        <Paper elevation={0} className="rounded-lg border border-gray-200 p-8">
            <Box textAlign="center">
                <Lock sx={{ fontSize: 64, color: "gray", mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Access Denied
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    You don't have permission to view the student list.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Please contact your administrator to request access.
                </Typography>
            </Box>
        </Paper>
    );

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
                            <School className="text-indigo-600" />
                            <Typography
                                variant="h6"
                                component="h1"
                                className="text-gray-800 font-semibold"
                            >
                                Student Management
                            </Typography>
                        </div>
                        {(!isStaff || permissions.canCreateStudent) && (
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
                                Add Student
                            </Button>
                        )}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {isStaff && !permissions.canReadStudent ? (
                        <NoPermissionView />
                    ) : (
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
                                                <TableCell>Standard</TableCell>
                                                <TableCell>Age</TableCell>
                                                <TableCell>Guardian</TableCell>
                                                <TableCell>Guardian Phone</TableCell>
                                                <TableCell align="right">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students.length > 0 ? (
                                                students.map((student) => (
                                                    <TableRow key={student._id} hover>
                                                        <TableCell>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Avatar>{student.name?.[0]}</Avatar>
                                                                {student.name}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>{student.standard}</TableCell>
                                                        <TableCell>{student.age}</TableCell>
                                                        <TableCell>{student.guardianName}</TableCell>
                                                        <TableCell>{student.guardianPhone}</TableCell>
                                                        <TableCell align="right">
                                                            {(!isStaff || permissions.canUpdateStudent) && (
                                                                <Tooltip title="Edit">
                                                                    <IconButton onClick={() => handleEdit(student)}>
                                                                        <Edit fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            )}
                                                            {(!isStaff || permissions.canDeleteStudent) && (
                                                                <Tooltip title="Delete">
                                                                    <IconButton
                                                                        onClick={() => handleDelete(student._id)}
                                                                    >
                                                                        <Delete fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            )}
                                                            {isStaff && !permissions.canUpdateStudent && !permissions.canDeleteStudent && (
                                                                <Typography variant="caption" color="textSecondary">
                                                                    No actions available
                                                                </Typography>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        <Typography>No students found</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    )}
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
                        {editingId ? "Edit Student" : "Add New Student"}
                    </Typography>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent className="p-6">
                        <Box className="space-y-4">
                            <TextField
                                fullWidth
                                label="Student Name"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal" error={!!errors.standard}>
                                <InputLabel>Standard</InputLabel>
                                <Controller
                                    name="standard"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Standard"
                                        >
                                            {standards.map((std) => (
                                                <MenuItem key={std} value={std}>
                                                    {std}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.standard && (
                                    <Typography variant="caption" color="error">
                                        {errors.standard.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Age"
                                type="number"
                                {...register("age", { valueAsNumber: true })}
                                error={!!errors.age}
                                helperText={errors.age?.message}
                                margin="normal"
                                InputProps={{ inputProps: { min: 3, max: 18 } }}
                            />

                            <Divider className="my-2" />

                            <TextField
                                fullWidth
                                label="Guardian Name"
                                {...register("guardianName")}
                                error={!!errors.guardianName}
                                helperText={errors.guardianName?.message}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                label="Guardian Phone"
                                {...register("guardianPhone")}
                                error={!!errors.guardianPhone}
                                helperText={errors.guardianPhone?.message}
                                margin="normal"
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
                                    ? "Update Student"
                                    : "Add Student"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={openPermissionModal}
                onClose={handleClosePermissionModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: "12px" } }}
            >
                <DialogTitle className="bg-red-50 border-b border-red-200">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Lock color="error" />
                        <Typography variant="h6" color="error">
                            Permission Denied
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent className="p-6">
                    <Alert severity="error">
                        <AlertTitle>Access Restricted</AlertTitle>
                        {permissionMessage}
                    </Alert>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Please contact your administrator to request the necessary permissions.
                    </Typography>
                </DialogContent>
                <DialogActions className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                    <Button
                        onClick={handleClosePermissionModal}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            bgcolor: "indigo.600",
                            "&:hover": { bgcolor: "indigo.700" },
                        }}
                    >
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddEditStudent;