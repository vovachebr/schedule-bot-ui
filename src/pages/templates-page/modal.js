import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Check } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modalRoot: {
      position: 'fixed',
      left: "35%",
      top: "10%",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    templateInput: {
      marginTop: "5%",
      marginBottom: "5%",
      width: "100%"
    },
    textArea: {
      resize: "none",
      width: "100%"
    }
  }));

export default function CreateTemplateModal(props){
    const classes = useStyles();
    const [messageText, setMessageText] = React.useState("");
    const [templateLabel, setTemplateLabel] = React.useState("");

    return (
    <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <div className={classes.modalRoot}>
            <TextField
              label="Название шаблона"
              variant="outlined"
              value={templateLabel}
              className={classes.templateInput}
              onChange={event => setTemplateLabel(event.target.value)}
            />

            <TextareaAutosize 
              className={classes.textArea}
              aria-label="minimum height"
              rowsMin={5}
              rowsMax={20}
              placeholder="Текст сообщения"
              value={messageText}
              onChange={event => setMessageText(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<Check/>}
              onClick={() => props.onCreate(messageText)}
            >
            {props.templateId ? "Обновить" : "Создать"}
            </Button>
        </div>
    </Modal>)
}