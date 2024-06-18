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
// import TopTable from "./TopTable";
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
  marginTop: "3vh",
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
const DoneColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  width: "18vw",
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

function Tables() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // for search function
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    batchId: "",
    centraId: "",
    status: "",
    inTimeRaw: "",
    rawWeight: "",
    inTimeWet: "",
    outTimeWet: "",
    wetWeight: "",
    inTimeDry: "",
    outTimeDry: "",
    dryWeight: "",
    inTimePowder: "",
    outTimePowder: "",
    powderWeight: "",
    packageId: "",
    rescaleWeight: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);

  // search functions
  const handleSearch = (searchId, searchName) => {
    const filtered = users.filter(
      (user) =>
        (searchId ? user.id.includes(searchId) : true) &&
        (searchName
          ? user.centra.toLowerCase().includes(searchName.toLowerCase())
          : true)
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
      batchId: "",
      centraId: "",
      status: "",
      inTimeRaw: "",
      rawWeight: "",
      inTimeWet: "",
      outTimeWet: "",
      wetWeight: "",
      inTimeDry: "",
      outTimeDry: "",
      dryWeight: "",
      inTimePowder: "",
      outTimePowder: "",
      powderWeight: "",
      packageId: "",
      rescaleWeight: "",
    });
    setIsEditMode(false);
    setEditUserIndex(null);
  };

  // when pressing the add user button in the popup, open the confirm password popup
  const handleAddUser = () => {
    const {
      batchId,
      centraId,
      status,
      inTimeRaw,
      rawWeight,
      inTimeWet,
      outTimeWet,
      wetWeight,
      inTimeDry,
      outTimeDry,
      dryWeight,
      inTimePowder,
      outTimePowder,
      powderWeight,
      packageId,
      rescaleWeight,
    } = newUser;

    if (
      !batchId ||
      !centraId ||
      !status ||
      !inTimeRaw ||
      !rawWeight ||
      !inTimeWet ||
      !outTimeWet ||
      !wetWeight ||
      !inTimeDry ||
      !outTimeDry ||
      !dryWeight ||
      !inTimePowder ||
      !outTimePowder ||
      !powderWeight ||
      !packageId ||
      !rescaleWeight
    ) {
      alert("Please fill out all the empty fields.");
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
    setNewUser({
      batchId: "",
      centraId: "",
      status: "",
      inTimeRaw: "",
      rawWeight: "",
      inTimeWet: "",
      outTimeWet: "",
      wetWeight: "",
      inTimeDry: "",
      outTimeDry: "",
      dryWeight: "",
      inTimePowder: "",
      outTimePowder: "",
      powderWeight: "",
      packageId: "",
      rescaleWeight: "",
    });
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
          Add Item
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
              maxHeight: "50%",
            },
          }}
        >
          {/* Add User title and the x cancel button */}
          <StyledDialogTitle>
            {isEditMode ? "Edit Item" : "Add Item"}
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
              <Label className="user-id-text">Batch ID </Label>
              <input
                type="text"
                id="user-id"
                value={newUser.batchId}
                onChange={(e) =>
                  setNewUser({ ...newUser, batchId: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="centra-name-text">Centra ID </Label>
              <input
                type="text"
                id="centra-name"
                value={newUser.centraId}
                onChange={(e) =>
                  setNewUser({ ...newUser, centraId: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="status-text">Status </Label>
              <input
                type="text"
                id="status"
                value={newUser.status}
                onChange={(e) =>
                  setNewUser({ ...newUser, status: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="in-time-raw-text">In Time Raw </Label>
              <input
                type="date"
                id="in-time-raw"
                value={newUser.inTimeRaw}
                onChange={(e) =>
                  setNewUser({ ...newUser, inTimeRaw: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="raw-weight-text">Raw Weight </Label>
              <input
                type="text"
                id="raw-weight"
                value={newUser.rawWeight}
                onChange={(e) =>
                  setNewUser({ ...newUser, rawWeight: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="in-time-wet-text">In Time Wet </Label>
              <input
                type="date"
                id="in-time-wet"
                value={newUser.inTimeWet}
                onChange={(e) =>
                  setNewUser({ ...newUser, inTimeWet: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="out-time-wet-text">Out Time Wet </Label>
              <input
                type="date"
                id="out-time-wet"
                value={newUser.outTimeWet}
                onChange={(e) =>
                  setNewUser({ ...newUser, outTimeWet: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="wet-weight-text">Wet Weight </Label>
              <input
                type="text"
                id="wet-weight"
                value={newUser.wetWeight}
                onChange={(e) =>
                  setNewUser({ ...newUser, wetWeight: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="in-time-dry-text">In Time Dry </Label>
              <input
                type="date"
                id="in-time-dry"
                value={newUser.inTimeDry}
                onChange={(e) =>
                  setNewUser({ ...newUser, inTimeDry: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="out-time-dry-text">Out Time Dry </Label>
              <input
                type="date"
                id="out-time-dry"
                value={newUser.outTimeDry}
                onChange={(e) =>
                  setNewUser({ ...newUser, outTimeDry: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="dry-weight-text">Dry Weight </Label>
              <input
                type="text"
                id="dry-weight"
                value={newUser.dryWeight}
                onChange={(e) =>
                  setNewUser({ ...newUser, dryWeight: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="in-time-powder-text">In Time Powder </Label>
              <input
                type="date"
                id="in-time-powder"
                value={newUser.inTimePowder}
                onChange={(e) =>
                  setNewUser({ ...newUser, inTimePowder: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="out-time-powder-text">Out Time Powder </Label>
              <input
                type="date"
                id="out-time-powder"
                value={newUser.outTimePowder}
                onChange={(e) =>
                  setNewUser({ ...newUser, outTimePowder: e.target.value })
                }
                className="date-picker"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="powder-text">Powder Weight </Label>
              <input
                type="text"
                id="powder"
                value={newUser.powderWeight}
                onChange={(e) =>
                  setNewUser({ ...newUser, powderWeight: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="package-id-text">Package ID </Label>
              <input
                type="text"
                id="package-id"
                value={newUser.packageId}
                onChange={(e) =>
                  setNewUser({ ...newUser, packageId: e.target.value })
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label className="rescale-weight-text">Rescale Weight </Label>
              <input
                type="text"
                id="rescale-weight"
                value={newUser.rescaleWeight}
                onChange={(e) =>
                  setNewUser({ ...newUser, rescaleWeight: e.target.value })
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

        <SearchBar onSearch={handleSearch} />

        {/* renders the entire table and all its items */}
        {/* <div className="table-items">
          <TopTable />
          {filteredUsers.map((user, index) => (
            <div key={index} className="table-item-storage">
              <div className="container1">
                <div className="container2">
                  <table>
                  <tr>
                    <td>{user.batchId}</td>
                    <td>{user.centraId}</td>
                    <td>{user.status}</td>
                    <td>{user.inTimeRaw}</td>
                    <td>{user.rawWeight}</td>
                    <td>{user.inTimeWet}</td>
                    <td>{user.outTimeWet}</td>
                    <td>{user.wetWeight}</td>
                    <td>{user.inTimeDry}</td>
                    <td>{user.outTimeDry}</td>
                    <td>{user.dryWeight}</td>
                    <td>{user.inTimePowder}</td>
                    <td>{user.outTimePowder}</td>
                    <td>{user.powderWeight}</td>
                    <td>{user.packageId}</td>
                    <td>{user.rescaleWeight}</td>
                    <td>
                        <EditAndDeleteColorButton 
                        variant="outlined"
                        onClick={() => handleEditUser(index)}
                      >
                        <ModeIcon />
                      </EditAndDeleteColorButton>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="container">
          <div className="container1">
            <div className="container2">
              <table>
                <thead>
                  <tr>
                    <td className="table-title">Batch ID</td>
                    <td className="table-title">Centra ID</td>
                    <td className="table-title">Status</td>
                    <td className="table-title">In Time Raw</td>
                    <td className="table-title">Raw Weight</td>
                    <td className="table-title">In Time Wet</td>
                    <td className="table-title">Out Time Wet</td>
                    <td className="table-title">Wet Weight</td>
                    <td className="table-title">In Time Dry</td>
                    <td className="table-title">Out Time Dry</td>
                    <td className="table-title">Dry Weight</td>
                    <td className="table-title">In Time Powder</td>
                    <td className="table-title">Out Time Powder</td>
                    <td className="table-title">Powder Weight</td>
                    <td className="table-title">Package ID</td>
                    <td className="table-title">Rescale Weight</td>
                    <td className="table-title">Edit</td>
                    <td className="table-title">Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="table-contents">{user.batchId}</td>
                      <td className="table-contents">{user.centraId}</td>
                      <td className="table-contents">{user.status}</td>
                      <td className="table-contents">{user.inTimeRaw}</td>
                      <td className="table-contents">{user.rawWeight}</td>
                      <td className="table-contents">{user.inTimeWet}</td>
                      <td className="table-contents">{user.outTimeWet}</td>
                      <td className="table-contents">{user.wetWeight}</td>
                      <td className="table-contents">{user.inTimeDry}</td>
                      <td className="table-contents">{user.outTimeDry}</td>
                      <td className="table-contents">{user.dryWeight}</td>
                      <td className="table-contents">{user.inTimePowder}</td>
                      <td className="table-contents">{user.outTimePowder}</td>
                      <td className="table-contents">{user.powderWeight}</td>
                      <td className="table-contents">{user.packageId}</td>
                      <td className="table-contents">{user.rescaleWeight}</td>
                      <td className="table-contents">
                        <EditAndDeleteColorButton
                          variant="outlined"
                          onClick={() => handleEditUser(index)}
                        >
                          <ModeIcon />
                        </EditAndDeleteColorButton>
                      </td>
                      <td className="table-contents">
                        <EditAndDeleteColorButton
                          variant="outlined"
                          onClick={() => {
                            const updatedUsers = users.filter(
                              (u, i) => i !== index
                            );
                            setUsers(updatedUsers);
                            setFilteredUsers(updatedUsers);
                          }}
                        >
                          Delete
                        </EditAndDeleteColorButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;