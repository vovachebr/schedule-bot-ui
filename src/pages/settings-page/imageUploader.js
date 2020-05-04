import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 370
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      height: 20
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    imageInput: {
      paddingTop: "15px",
    },
    cardText: {
      textAlign: "left"
    },
    loader: {
      display: "flex",
      alignItems: "center",
      marginTop: "5%"
    }
}));

export default function ImageUploader() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const inputRef = React.createRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const saveImage = () => {
      const formData = new FormData();
      formData.append('avatar', inputRef.current.children[0].files[0]);
      fetch('/images/addImage', {
        method: 'POST',
        body: formData
      }).then(res => console.log(res));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Загрузчик изображений
          </Typography>
          <Typography component="p" className={classes.cardText}>
            Используйте префиксы:<br/>
            <strong>преподаватель_</strong> - аватарки преподавателя<br/>
            <strong>фон_</strong> - фонового изображения<br/>
            <strong>лого_</strong> - логитипа<br/>
          </Typography>
          <div className={classes.loader}>
            <Input 
              className={classes.imageInput}
              type="file"
              ref={inputRef}
              inputProps={{accept:".jpg, .jpeg, .png"}}
            />
            <div className={classes.wrapper}>
              <Fab
                size="small"
                aria-label="save"
                color="primary"
                className={buttonClassname}
                onClick={saveImage}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
