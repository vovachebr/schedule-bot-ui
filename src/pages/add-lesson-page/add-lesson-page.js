import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Stars } from '@material-ui/icons';

import { HooksContext } from '../../App';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 500,
  },
  page: {
    display: "flex",
    justifyContent: "space-around"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "40%"
  },
  pre: {
    display: "block",
    padding: "9.5px",
    margin: "0 0 10px",
    wordBreak: "break-all",
    wordWrap: "break-word",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "10px",
    whiteSpace: "pre-wrap"
  },
  messageConstructor:{
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between"
  }
}));

function AddLessonPage() {
  const classes = useStyles();

  const [hook, setHook] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className={classes.page}>
      <div className={classes.column}>
          <h1>Конструктор сообщения:</h1>
          <div className={classes.messageConstructor}>
          <HooksContext.Consumer>
          {data => (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Группа/канал
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={hook}
                onChange={event => setHook(event.target.value)}
                labelWidth={labelWidth}
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  data.hooks.map(h => <MenuItem value={h.value} key={h.value}>Группа: "{h.group}", канал: "{h.channel}".</MenuItem>)
                }
              </Select>
            </FormControl>
          )}
        </HooksContext.Consumer>
        <TextField label="Название занятия" variant="outlined" />
        <Button variant="outlined" color="primary" >
          Попробовать получить уже существующее занятие
          <Stars />
        </Button>
        //TODO: Добавить выбор даты и времени
        <TextField label="Лектор" variant="outlined" />
        <TextareaAutosize aria-label="minimum height" rowsMin={5} rowsMax={10} placeholder="Обсужтаемые темы" />
        <TextField label="Ссылка на изображение" variant="outlined" />
        </div>
      </div>
      <div className={classes.column}>
        <h1>Результат сообщения:</h1>
        <h2>Группа: {"не задана"}</h2>
        <h2>Сообщение:</h2>
        <pre className={classes.pre}>"asdfasdf"</pre>
        <img alt="не загружается" width="650px" height="350px" />
        <Button variant="contained">Создать занятие</Button>
      </div>
    </div>
  );
}

export default AddLessonPage;
