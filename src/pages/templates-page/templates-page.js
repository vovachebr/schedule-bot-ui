import React from 'react';
import { withSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NoteAdd } from '@material-ui/icons';

import CreateTemplateModal from './modal';

const useStyles = makeStyles((theme) => ({
    template: {
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    buttonAdd: {
      marginBottom: "5%"
    },
    list: {
      width: "90%"
    }
  }));

function TemplatesPage({enqueueSnackbar}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [templates, setTemplates] = React.useState([]);
  const [isLoadingTemplate, setIsLoadingTemplate] = React.useState(false);

  const getTemplates = () => {
    setIsLoadingTemplate(true);
    fetch('/templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(res => {
      setTemplates(res.templates);
      setIsLoadingTemplate(false);
    });
  };

  React.useEffect(() => {
    if(!templates.length)
      getTemplates();
  });
  
  return (
    <div className={classes.template}>
        <Button
          className={classes.buttonAdd}
          variant="contained"
          color="primary"
          endIcon={<NoteAdd/>}
          onClick={() => setOpenModal(true)}
        >
        Создать шаблон сообщения
        </Button>
        {isLoadingTemplate && <CircularProgress />}
        <CreateTemplateModal 
            open={openModal} 
            onCreate={(message)=> console.log(message)}
            onClose={() => setOpenModal(false)}
        />
        {!isLoadingTemplate && <List
          subheader={
            <ListSubheader>
              Список шаблонов
            </ListSubheader>
          }
          className={classes.list}
        >
          {templates.map(t => 
          <ListItem button>
            <ListItemText primary={t.title} />
          </ListItem>)}
        </List>}
    </div>
  );
}

export default withSnackbar(TemplatesPage);
