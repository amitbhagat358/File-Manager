import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({fileOpen, setFileOpen, fileData, setFileData, writeFile}) {
  const [open, setOpen] = React.useState(fileOpen.value);
  const [inputData, setInputData] = React.useState(fileData)
  const [saveClicked, setSaveClicked] = React.useState(false);

  const handleSave = () => {
    if (!saveClicked) {
      setFileData(inputData); // Set fileData first
      setInputData('')
      setSaveClicked(true);
    }
  };

  React.useEffect(() => {
    if (saveClicked) {
      writeFile(fileOpen.name); // Trigger writeFile only after setFileData is completed
      setFileData('');
      handleClose();
    }
  }, [saveClicked]);


  const makeInputEmpty =  () =>{
    setInputData("");
  }

  const handleClose = async () => {
    setOpen(false);
    await makeInputEmpty();
    setFileOpen((prev)=> {
      return {value:!prev.value, name:prev.name}
    });
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {fileOpen.name}
            </Typography>
            <Button color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          id="textarea"
          multiline
          autoFocus
          rows={33}
          spellCheck={'false'}
          value={inputData}
          onChange={(e)=> {
            setInputData(e.target.value);
          }}
        />
      </Dialog>
    </React.Fragment>
  );
}
