import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useCreateCustomerMutation, useCreateFileMutation } from "../../features/api";


const AddCustomer = () => {
    const [customer, setCustomer] = useState({});
    const [createCustomer] = useCreateCustomerMutation();
    const [file, setFile] = useState(null);
    const [updateFile] = useCreateFileMutation();

    const handleChange = (e) => {
        console.log(e.target.name);
        if (e.target.name === "image") {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile, selectedFile.name);
                setFile(formData);
                setCustomer({
                    ...customer,
                    image: selectedFile.name,
                });

            }
        } else {
            setCustomer({
                ...customer,
                [e.target.name]: e.target.value
            })
        }
    };
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Add Customer" subtitle="Add Customer to Customer List" />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <form>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="First Name:"
                                name="firstName"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Last Name:"
                                name="lastName"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email:"
                                name="email"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Phone:"
                                name="phone"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Address:"
                                name="address"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="User Name:"
                                name="username"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Pass Word:"
                                name="password"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                type="file"
                                label="Image :"
                                name="image"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button variant="outlined" sx={{ mr: 2 }}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    createCustomer(customer);
                                    updateFile(file);
                                    console.log(customer)
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AddCustomer;