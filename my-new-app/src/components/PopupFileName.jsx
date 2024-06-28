import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import IconButton from '@mui/material/IconButton';

export default function FormDialog({ checkFile, itemClick, openFile }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="createFile" onClick={() => handleClickOpen()}>
        <IconButton
          sx={{ color: '#70bef2' }}
          aria-label="Create Folder"
          size="small"
        >
          <NoteAddIcon />
        </IconButton>
        <div className="renameText">
          <span>New File</span>
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
            const fileName = formJson.fileName;
            checkFile(fileName);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create New File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="fileName"
            label="File Name with extension"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create File</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
