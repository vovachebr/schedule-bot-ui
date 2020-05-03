import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    imageInput: {
      paddingTop: "15px",
      marginRight: "5%"
    }
}));

export default function Users() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const inputRef = React.createRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const saveImage = () => {
      const formData = new FormData();
      formData.append("fileToUpload", inputRef.current.children[0].files[0]);
      //TODO: отправлять файл
      debugger;
  };

  return (
    <>
      <FormControl>
        <Input className={classes.imageInput} type="file" ref={inputRef} inputProps={{accept:".jpg, .jpeg, .png"}}/>
      </FormControl>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={saveImage}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </>
  );
}
