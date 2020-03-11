import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Send } from '@material-ui/icons';

import { HooksContext } from '../../App';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 200,
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

function SendMessagePage() {
  const classes = useStyles();

  const [channel, setChannel] = React.useState('');
  const [message, setMessage] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const sendMessage = () => {
    fetch('/sendInstantMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({channel, text: message})
    })
  };

  return (
    <div className="SendMessagePage">
      <h2>Отправка мгновенных сообщений</h2>
      <div className={classes.constainer}>
        <HooksContext.Consumer>
        {data => (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Группа/канал
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={channel}
              onChange={event => setChannel(event.target.value)}
              labelWidth={labelWidth}
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                data.hooks.map(h => <MenuItem value={h.channel} key={h.channel}>Группа: "{h.group}", канал: "{h.channel}".</MenuItem>)
              }
            </Select>
          </FormControl>
            )}
        </HooksContext.Consumer>
        <TextField
          id="standard-multiline-static"
          label="Отправляемое сообщение"
          multiline
          rows="8"
          value={message}
          onInput={e => setMessage(e.target.value)}
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

export default SendMessagePage;
