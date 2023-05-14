import axios from 'axios';
import React from "react";
import {Link} from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, 
        Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
        Alert, AlertTitle, Snackbar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CSS from 'csstype';




const Users = () => {

    const [users, setUsers] = React.useState < Array < User >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const [dialogUser, setDialogUser] = React.useState<User>({ username: "", user_id: -1 })
    const [usernameEdit, setUsernameEdit] = React.useState("")
    const [snackOpen, setSnackOpen] = React.useState(false)
    const [snackMessage, setSnackMessage] = React.useState("")

    const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
                return;
            }
            setSnackOpen(false);
        };
        

    const card: CSS.Properties = {
        padding: "10px",
        margin: "20px",
    }

    interface HeadCell {
        id: string;
        label: string;
        numeric: boolean;
        }
    const headCells: readonly HeadCell[] = [
        { id: 'ID', label: 'id', numeric: true },
        { id: 'username', label: 'Username', numeric: false },
        { id: 'link', label: 'Link', numeric: false },
        { id: 'actions', label: 'Actions', numeric: false }
    ];

    const updateUsernameEditState = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsernameEdit(event.target.value)
    }

    const handleDeleteDialogOpen = (user: User) => {
        setDialogUser(user)
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDialogUser({ username: "", user_id: -1 })
        setOpenDeleteDialog(false);
    };

    const handleEditDialogOpen = (user: User) => {
        setDialogUser(user)
        setOpenEditDialog(true);
    };
    const handleEditDialogClose = () => {
        setDialogUser({ username: "", user_id: -1 })
        setOpenEditDialog(false);
    };


    React.useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setUsers(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const updateUser = (user: User) => {
        if (usernameEdit === "") {
            alert("Please enter a username!")
        } else {
            axios.put('http://localhost:3000/api/users/' + user.user_id, { "username": usernameEdit })
                .then((response) => {
                    setSnackMessage("Username changed successfully")
                    setSnackOpen(true)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                });
        }
    }

    const deleteUser = (user: User) => {
        axios.delete('http://localhost:3000/api/users/' + user.user_id)
            .then((response) => {
                setSnackMessage("User deleted successfully")
                setSnackOpen(true)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const user_rows = () => {
            return users.map((row: User) =>
                <TableRow hover
                    tabIndex={-1}
                    key={row.user_id}>
                    <TableCell>
                        {row.user_id}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right"><Link
                        to={"/users/" + row.user_id}>Go to user</Link></TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" endIcon={<EditIcon />} onClick={() => { handleEditDialogOpen(row) }}>
                            Edit
                        </Button>
                        <Button variant="outlined" endIcon={<DeleteIcon />} onClick={() => { handleDeleteDialogOpen(row) }}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            )
        }
        

    if (errorFlag) {
        return (
            <div>
                {errorFlag &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>}

            </div>
        )
    } else {
        return (
            <div>
                <Paper elevation={3} style={card}>
                    <h1>Users</h1>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.numeric ? 'right' :
                                                'left'}
                                            padding={'normal'}>
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user_rows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>


                <Dialog
                    open={openEditDialog}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Edit User."}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please enter a new username.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <TextField id="outlined-basic" label="Username" variant="outlined"
                            value={usernameEdit} onChange={updateUsernameEditState} />

                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button variant="outlined" color="error" onClick={() => {
                            updateUser(dialogUser)
                            if (usernameEdit !== "") {
                                handleEditDialogClose()
                            }
                        }} autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDeleteDialog}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Delete User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button variant="outlined" color="error" onClick={() => {
                            deleteUser(dialogUser)
                            handleDeleteDialogClose()
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    autoHideDuration={6000}
                    open={snackOpen}
                    onClose={handleSnackClose}
                    key={snackMessage}
                >
                    <Alert onClose={handleSnackClose} severity="success" sx={{
                        width: '100%'
                    }}>
                        {snackMessage}
                    </Alert>
                </Snackbar>


            </div>
        )
    }
}

export default Users;