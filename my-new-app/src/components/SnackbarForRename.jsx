import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({msg, setMsg, content}) {
  const [open, setOpen] = React.useState(msg);

  React.useEffect(()=>{
    setTimeout(()=>{
      setMsg(false);
          }, 4000)
  }, [msg])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMsg(false);
  };

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>

        <Alert
          onClose={handleClose}
          severity={content}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {content==="success"? "Item renamed successfully !":"Item with same name already exists" }
        </Alert>
      </Snackbar>
    </div>
  );
}
