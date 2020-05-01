import React from 'react';
import { withSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NoteAdd } from '@material-ui/icons';

import CreateTemplateModal from './modal';

const useStyles = makeStyles((theme) => ({
    createTemplateButton: {
        float: "left",
        marginLeft: "5%",
        marginTop: "2%",
    },
  }));

function TemplatesPage({enqueueSnackbar}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  
  return (
    <div>
        <Button
          className={classes.createTemplateButton}
          variant="contained"
          color="primary"
          endIcon={<NoteAdd/>}
          onClick={() => setOpenModal(true)}
        >
        Создать шаблон сообщения
        </Button>
        <CreateTemplateModal 
            open={openModal} 
            onCreate={(message)=> console.log(message)}
            onClose={() => setOpenModal(false)}
        />
    </div>
  );
}

export default withSnackbar(TemplatesPage);
