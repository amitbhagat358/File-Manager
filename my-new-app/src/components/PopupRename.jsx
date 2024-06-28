import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton';

export default function FormDialog({ rename, itemClick, selectedItem }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="rename" onClick={() => {if(selectedItem.name!== "")setOpen(true)}}>
        <div className="renameIcon">
          <IconButton
            sx={{ color: '#70bef2' }}
            aria-label="rename"
            size="small"
            disabled ={selectedItem.name===""}
          >
            <EditIcon />
          </IconButton>
        </div>
        <div className="renameText" style={selectedItem.name === ''? {color:"#b6b6b7", cursor:"default"}:null}>
          <span>Rename</span>
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
            const newName = formJson.newName;
            rename( selectedItem.name , newName);
            handleClose();
          },
        }}
      >
        <DialogTitle>Rename {selectedItem.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="newName"
            label="New Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Rename </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
