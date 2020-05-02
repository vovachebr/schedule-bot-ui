import React from 'react';
import { withSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Send } from '@material-ui/icons';

import { HooksContext } from '../../App';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "2% 0 2% 0",
    minWidth: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  constainer: {
    width: "90%",
    marginLeft: "5%",
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: "20%",
    position: "relative",
    left: "80%",
    marginTop: "2%"
  },
  pre: {
    width: "fit-content",
    marginLeft:"1%",
    marginTop: "-3%",
    textAlign: "start"
  }
}));

function SendMessagePage({enqueueSnackbar}) {
  const classes = useStyles();

  const [channel, setChannel] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [templates, setTemplate] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = React.useState(false);

  const sendMessage = () => {
    if(!channel){
      enqueueSnackbar("Канал не был выбран", { variant: 'error' });
      return;
    };

    fetch('/sendInstantMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({channel, text: message})
    })
    enqueueSnackbar("Сообщение отправлено", { variant: 'info' });
  };

  const getTemplates = () => {
    setIsLoadingTemplate(true);
    fetch('/templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(res => {
      setTemplate(res.templates);
      setIsLoadingTemplate(false);
    });
  };

  const getTemplate = (template) => {
    setIsLoadingTemplate(true);
    fetch(`/templates?id=${template.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(res => {
      setIsLoadingTemplate(false);
      setMessage(res.template.text);
    });
  };
  
  React.useEffect(() => {
    if(!templates.length)
      getTemplates();
  });

  return (
    <div className="SendMessagePage">
      <h2>Отправка мгновенных сообщений</h2>
      <div className={classes.constainer}>
        <HooksContext.Consumer>
        {data => (
          <FormControl variant="outlined" className={classes.formControl}>
            <Autocomplete
                id="channel-combo-box"
                options={data.hooks}
                getOptionLabel={(h) => `Группа: "${h.group}", канал: "${h.channel}".`}
                onChange={(event, value) => setChannel(value? value.channel : {})}
                style={{ width: '45%' }}
                renderInput={(params) => <TextField {...params} label="Группа/канал" variant="outlined" />}
              />
            {isLoadingTemplate && <CircularProgress />}
            <Autocomplete
                id="template-combo-box"
                options={templates}
                value={selectedTemplate}
                getOptionLabel={(h) => `${h.title}`}
                onChange={(event, value) => {
                  setSelectedTemplate(value);
                  if(value){
                    getTemplate(value);
                  }
                }}
                style={{ width: '45%'}}
                renderInput={(params) => <TextField {...params} label="Шаблон сообщения" variant="outlined" />}
              />
          </FormControl>
            )}
        </HooksContext.Consumer>
        <TextField
          id="standard-multiline-static"
          label="Отправляемое сообщение"
          multiline
          rows="8"
          value={message}
          onInput={e => {setMessage(e.target.value); setSelectedTemplate(null)}}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Send/>}
          onClick={sendMessage}
        >
        Отправить
        </Button>
      </div>
      <pre className={classes.pre}>
        {`
        Оповещения для слака:
        <@U024BE7LH> - оповещение пользователя по ID
        @here - оповещение только активных участников канала
        @channel - оповещение всех участников канала
        @everyone - оповещение всех участников из канала #general (т.е. каждый не приглашенный пользователь).`}
      </pre>
    </div>
  );
}

export default withSnackbar(SendMessagePage);
