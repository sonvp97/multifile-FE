import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import React, {useState} from "react";
import { useGetCustomerQuery,useUpdateCustomerMutation,useCreateFileMutation } from "../../features/api";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Modal, Typography, TextField, Button } from "@mui/material";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomerQuery();
  const [updateCustomer] = useUpdateCustomerMutation();

  const [open, setOpen] = useState(false);
  const handleDeleteRow = (row) => {
    // Implement your logic to delete the row here
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [editingValue, setEditingValue] = useState(null);
  const [file, setFile] = useState(null);
  const [updateFile] = useCreateFileMutation();

  const handleEditRow = (row) => {
    setOpen(true);
    setEditingValue(row);
  };
  const handleCloseEdit = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    updateCustomer(editingValue);
    console.log(editingValue)
    console.log(file);
    updateFile(file);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Name",
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.8,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
    },
    {
      field: "edit",
      headerName: "Actions",
      headerAlign: 'center',
      flex: 0.5,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleEditClick = () => {
          handleEditRow(params.row);
        };
        const handleDeleteClick = () => {
          handleDeleteRow(params.row);
        };
        return (
          <>
            <IconButton onClick={handleEditClick} sx={{ml:"2rem"}}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];
  // const updatedColumns = [...columns, editColumn, deleteColumn];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          checkboxSelection
          // onSelectionModelChange={(ids) => setSelectedRowIds(ids)}
        />
        <Modal
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Customer
        </Typography>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={editingValue?.firstName || ""}
          onChange={(event) => {
            setEditingValue({
              ...editingValue,
              firstName: event.target.value,
            });
          }}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={editingValue?.lastName || ""}
          onChange={(event) => {
            setEditingValue({
              ...editingValue,
              lastName: event.target.value,
            });
          }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={editingValue?.email || ""}
          onChange={(event) => {
            setEditingValue({
              ...editingValue,
              email: event.target.value,
            });
          }}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          variant="outlined"
          value={editingValue?.phone || ""}
          onChange={(event) => {
            setEditingValue({
              ...editingValue,
              phone: event.target.value,
            });
          }}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          variant="outlined"
          value={editingValue?.address || ""}
          onChange={(event) => {
            setEditingValue({
              ...editingValue,
              address: event.target.value,
            });
          }}
        />
        <TextField
  type="file"
  onChange={(event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile,selectedFile.name);
      setFile(formData);
      setEditingValue({
        ...editingValue,
        image: selectedFile.name,
      });
      
    }
  }}
/>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Save
        </Button>
      </Box>
      </Modal>
      </Box>
    </Box>
  );
};

export default Customers;
