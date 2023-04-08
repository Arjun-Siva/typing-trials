import { useState } from "react";
import { useAuthContext } from '../../../hooks/useAuthContext';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Confetti from 'react-confetti';
import CustomSnackbar from "../../Snackbar/CustomSnackbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ResultModal(props) {
  const accuracy = props.accuracy;
  const speed = props.speed;

  const [open, setOpen] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const { user } = useAuthContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const score = { speed, accuracy };

    const response = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify(score),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    if (!response.ok) {
      setSnackbarMessage('Unable to save score');
      setMessageType('error');
      setOpenSnackBar(true);
    }
    if (response.ok) {
      setSnackbarMessage('Score saved successfully');
      setMessageType('success');
      setOpenSnackBar(true);
    }
    setOpen(false);
  }

  return (
    <div>
      <Confetti />
      <CustomSnackbar message={snackBarMessage} open={openSnackBar} type={messageType}/>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Results
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Accuracy: {accuracy} %
          </Typography>
          <Typography gutterBottom>
            Speed: {speed} WPM
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} disabled={!user}>
            Save results
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
