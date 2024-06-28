import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import IconButton from '@mui/material/IconButton';
export default function FormDialog({
  createFolder,
  itemClick,
  setErrorInFolder,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="createFolder" onClick={handleClickOpen}>
        <IconButton sx={{ color: '#70bef2' }} aria-label="Create Folder" size="small">
          <CreateNewFolderIcon />
        </IconButton>
        <div className="renameText">
          <span> New Folder</span>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const folderName = formJson.folderName;
            createFolder(folderName);
            itemClick({ name: folderName, type: 'directory' });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="folderName"
            label="Folder Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create Folder</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
