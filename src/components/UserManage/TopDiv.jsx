// contains all the functionality basically
// first and last name doesn't do anything yet
// mb guys its all in one file gw gatau benerinnya gmn tkut break

import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../../Admin.css";
import TopTable from "./TopTable";
import SearchBar from "./SearchBar";
import ModeIcon from '@mui/icons-material/Mode';

// to style the Add User text in the popup (this comment below only so the theme is not red underlined)
// eslint-disable-next-line no-unused-vars
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

// style the Add button in the website
// eslint-disable-next-line no-unused-vars
const AddColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  width: "13vw",
  height: "6vh",
  marginTop: "14vh",
  borderRadius: 10,
  fontWeight: 600,
  textTransform: "none",
  fontSize: 20,
  backgroundColor: "#EFEFEF",
  "&:hover": {
    backgroundColor: "#CFCFCF",
  },
}));

// style the Add button in the popup
// eslint-disable-next-line no-unused-vars
const ConfirmColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  width: "20vw",
  height: "4vh",
  borderRadius: 20,
  fontWeight: 400,
  textTransform: "none",
  fontSize: 20,
  backgroundColor: "#467E18",
  "&:hover": {
    backgroundColor: "#274C08",
  },
}));

// style the Done button in the popup
// eslint-disable-next-line no-unused-vars
// const DoneColorButton = styled(Button)(({ theme }) => ({
//   color: "white",
//   width: "18vw",
//   height: "4vh",
//   borderRadius: 20,
//   fontWeight: 400,
//   textTransform: "none",
//   fontSize: 20,
//   backgroundColor: "#467E18",
//   "&:hover": {
//     backgroundColor: "#274C08",
//   },
// }));

// style the popup content positioning
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1), // Spacing between the form elements
}));

// style the green buttons in the popup so it stays in the middle
const StyledDialogActions = styled(DialogActions)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

// style the input text fields
const LabelInputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  paddingBottom: "10px",
});

const Label = styled("Label")({
  minWidth: "16vw", // Set a minimum width for labels
});

// style the edit and delete buttons in the table
// eslint-disable-next-line no-unused-vars
const EditAndDeleteColorButton = styled(Button)(({ theme }) => ({
  color: "#fff", // Text color
  borderRadius: "10px",
  backgroundColor: "#033324",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#274C08", // Darker green on hover
  },
}));

// FUNCTION STARTS HERE

function TopDiv() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // for search function
  const [open, setOpen] = useState(false);
  // const [confirmOpen, setConfirmOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    // id: "",
    // email: "",
    password: "",
    role: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [passwordAdminConfirm, setPasswordAdminConfirm] = useState("");
  // const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);

  // search functions
  const handleSearch = (searchId, searchName) => {
    const filtered = users.filter(user =>
      (searchId ? user.id.includes(searchId) : true) &&
      (searchName ? user.email.toLowerCase().includes(searchName.toLowerCase()) : true)
    );
    setFilteredUsers(filtered);
  };

  // open popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close popup
  const handleClose = () => {
    setOpen(false);
    setNewUser({
      // id: "",
      // email: "",
      password: "",
      role: "",
    });
    setPasswordConfirm("");
    setIsEditMode(false);
    setEditUserIndex(null);
  };

  // close confirm password popup
  // const handleConfirmClose = () => {
  //   setConfirmOpen(false);
  //   setPasswordAdminConfirm("");
  // };

  // when pressing the add user button in the popup, open the confirm password popup
  const handleAddUser = () => {
    // const { id, email, password, role } = newUser;
    const { password, role } = newUser;

    // if (!id || !email || !password || !role) {
    if ( !password || !role) {
      alert('Please fill out all the empty fields.');
    } else if (password !== passwordConfirm) {
      alert('Passwords do not match.');
    } else {
      handleConfirmAddUser();
    }
  };

  // finish adding user
  const handleConfirmAddUser = () => {
    // updates user if in edit mode, otherwise adds a new user
    if (isEditMode) {
      const updatedUsers = users.map((user, index) =>
        index === editUserIndex ? newUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers)
    } else {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
    // setNewUser({ id: "", email: "", password: "", role: "" });
    setNewUser({password: "", role: "" });
    handleClose();
  };

  // opens the popup with pre-filled data for editing
  const handleEditUser = (index) => {
    setNewUser(filteredUsers[index]);
    setPasswordConfirm(filteredUsers[index].password);
    setIsEditMode(true);
    setEditUserIndex(index);
    handleClickOpen();
  };

  return (
    <div className="top-div">
      <div className="add-user">
        {/* add user button in main page */}
        <AddColorButton
          variant="contained"
          className="add-user"
          onClick={handleClickOpen}
        >
          Add User
        </AddColorButton>

        {/* opens popup */}
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "20px",
            },
          }}
        >
          {/* Add User title and the x cancel button */}
          <StyledDialogTitle>
            {isEditMode ? "Edit User" : "Add User"}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </StyledDialogTitle>

          {/* content of the popup */}
          <StyledDialogContent>
            {/* <LabelInputContainer>
              <Label className="user-id-text">User ID </Label>
              <input
                type="text"
                id="user-id"
                value={newUser.id}
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              />
            </LabelInputContainer> */}

            <LabelInputContainer>
              <Label className="first-name-text">First Name </Label>
              <input type="text" id="first-name" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="last-name-text">Last Name </Label>
              <input type="text" id="last-name" />
            </LabelInputContainer>

            {/* <LabelInputContainer>
              <Label className="email-text">Email </Label>
              <input
                type="email"
                id="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </LabelInputContainer> */}

            <LabelInputContainer>
              <Label className="password-text">Password </Label>
              <input
                type="text"
                id="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="confirm-password-text">Confirm Password </Label>
              <input
                type="text"
                id="confirm-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="role-text">Role </Label>
              <select
                name="roles"
                id="role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="">None</option>
                <option value="XYZ">XYZ</option>
                <option value="Harbor">Harbor</option>
                <option value="Centra">Centra</option>
              </select>
            </LabelInputContainer>

            {/* centra dropdown from 1 to 36, if u pick centra, another dropdown appears */}
            {newUser.role === 'Centra' && (
            <LabelInputContainer>
              <Label className="centra-number-text"></Label>
              <select name="centraNo" id="centra-number">
                {/* zzz lazy */}
                {[...Array(36).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </LabelInputContainer>
            )}

          </StyledDialogContent>

          {/* the add button in the popup */}
          <StyledDialogActions>
            <ConfirmColorButton
              variant="contained"
              onClick={handleAddUser}
              className="add-user-popup-button"
            >
              {isEditMode ? "Edit" : "Add"}
            </ConfirmColorButton>
          </StyledDialogActions>
        </Dialog>
        
        {/* confirm password popup */}
        {/* <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "20px",
            width: "30vw",
          },
        }}>
          <StyledDialogTitle>
            Confirm Password
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleConfirmClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </StyledDialogTitle> */}

          {/* confirm password contents */}
          {/* <StyledDialogContent>
            <LabelInputContainer>
              <Label className="password-in-confirm-text">Insert Admin Password </Label>
    
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password-in-confirm"
                value={passwordAdminConfirm}
                onChange={(e) =>
                  setPasswordAdminConfirm(e.target.value)}
              />
              <IconButton
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                style={{ position: "absolute", right: '3vw', top: '12vh' }}
              >
                {passwordVisibility ? <KeyOffIcon /> : <KeyIcon />}
              </IconButton>
              
            </LabelInputContainer>
          </StyledDialogContent> */}

          {/* confirm password done */}
          {/* <StyledDialogActions>
          <DoneColorButton
              variant="contained"
              onClick={handleConfirmAddUser}
              className="confirm-user-button"
            >
              Done
            </DoneColorButton>
          </StyledDialogActions>
        </Dialog> */}

        <SearchBar onSearch={handleSearch}/>

        {/* renders the top part of the table and all its items */}
        <div className="table-items">
          <TopTable />
          {filteredUsers.map((user, index) => (
            <div key={index} className="table-item-user">
              {/* <p>{user.id}</p>
              <p>{user.email}</p> */}
              <p>insert text here</p>
              <p>insert text here</p>
              <p>{'*'.repeat(user.password.length)}</p>
              <p>{user.role}</p>
              <p>
                <EditAndDeleteColorButton 
                  variant="outlined"
                  onClick={() => handleEditUser(index)}
                  >
                  <ModeIcon />
                </EditAndDeleteColorButton>
              </p>
              <p>
                <EditAndDeleteColorButton
                  variant="outlined"
                  onClick={() => {
                    const updatedUsers = users.filter((u, i) => i !== index);
                    setUsers(updatedUsers);
                    setFilteredUsers(updatedUsers);
                  }}
                >
                  Delete
                </EditAndDeleteColorButton>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopDiv;
