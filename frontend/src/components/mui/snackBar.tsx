import React, { SyntheticEvent, useState, useEffect } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Message } from 'src/lib/interfaces';

export const MessageSnackbar: React.FC<{ message: Message }> = ({
  message,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.text) setOpen(true);
  }, [message]);

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason !== 'clickaway') setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleClose} variant='filled' severity={message.type}>
        {message.text}
      </MuiAlert>
    </Snackbar>
  );
};
