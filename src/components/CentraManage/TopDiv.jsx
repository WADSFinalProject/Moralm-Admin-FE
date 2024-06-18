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
  borderRadius: 10,
  marginTop: "14vh",
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
  const [newUser, setNewUser] = useState({
    id: "",
    centra: "",
    location: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);

  // search functions
  const handleSearch = (searchId, searchName) => {
    const filtered = users.filter(user =>
      (searchId ? user.id.includes(searchId) : true) &&
      (searchName ? user.centra.toLowerCase().includes(searchName.toLowerCase()) : true)
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
      id: "",
      centra: "",
      location: "",
    });
    setIsEditMode(false);
    setEditUserIndex(null);
  };

  // when pressing the add user button in the popup, open the confirm password popup
  const handleAddUser = () => {
    const { id, centra, location } = newUser;

    if (!id || !centra || !location) {
      alert('Please fill out all the empty fields.');
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
      setFilteredUsers(updatedUsers);
    } else {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
    setNewUser({ id: "", centra: "", location: ""});
    handleClose();
  };

  // opens the popup with pre-filled data for editing
  const handleEditUser = (index) => {
    const userToEdit = filteredUsers[index];
    setNewUser(userToEdit);
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
          Add Centra
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
            {isEditMode ? "Edit Centra" : "Add Centra"}
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
            <LabelInputContainer>
              <Label className="user-id-text">Centra ID </Label>
              <input
                type="text"
                id="user-id"
                value={newUser.id}
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="centra-name-text">Centra Name </Label>
              <input
                type="text"
                id="centra-name"
                value={newUser.centra}
                onChange={(e) => setNewUser({ ...newUser, centra: e.target.value })}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="location-text">Location </Label>
              <input
                type="text"
                id="location"
                value={newUser.location}
                onChange={(e) =>
                  setNewUser({ ...newUser, location: e.target.value })
                }
              />
            </LabelInputContainer>
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
        

        <SearchBar onSearch={handleSearch}/>

        {/* renders the top part of the table and all its items */}
        <div className="table-items">
          <TopTable />
          {filteredUsers.map((user, index) => (
            <div key={index} className="table-item-centra">
              <p>{user.id}</p>
              <p>{user.centra}</p>
              <p>{user.location}</p>
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
