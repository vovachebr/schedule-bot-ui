import React from 'react';
import {withSnackbar} from 'notistack';

import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Stars} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker
} from '@material-ui/pickers';
import {HooksContext} from '../../App';

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
    whiteSpace: "pre-wrap",
    textAlign: "initial"
  },
  messageConstructor: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between"
  },
  sendButton: {
    marginTop: "163px",
  },
  sendButton2: {
    marginTop: "10px"
  },
  delayedDispatchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: "column"
  }
}));

function AddLessonPage({enqueueSnackbar}) {
  const classes = useStyles();

  const [hook, setHook] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [lecture, setLecture] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [lector, setLector] = React.useState("");
  const [additional, setAdditional] = React.useState("");
  const [earlyNotificationDate, setEarlyNotificationDate] = React.useState(new Date());
  const [earlyNotificationText, setEarlyNotificationText] = React.useState("");
  const [delayedDispatch, setDelayedDispatch] = React.useState(false);

  const getDate = () => {
    const options = {
      month: 'numeric',
      day: 'numeric'
    };
    let todayDay = selectedDate.toLocaleString("ru", options);
    const getMounth = (num) => [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"][num];
    const splittedData = todayDay.split(".");
    splittedData[1] = getMounth(+splittedData[1] - 1);
    return splittedData.join(' ');
  }

  const getTime = () => {
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return selectedDate.toLocaleString("ru", options);
  }

  const getLastLesson = () => {
    const course = hook.group.split('-')[0].toUpperCase();
    fetch(`/lessons/getLastLecture?lecture=${lecture}&course=${course}`)
      .then(response => response.json())
      .then(result => {
        if (result.success && result.lesson) {
          setLecture(result.lesson.lessonName);
          setLector(result.lesson.teacher);
          setAdditional(result.lesson.additional);
          enqueueSnackbar("Успешно найдено", {variant: 'info'});
        } else {
          enqueueSnackbar(result.error || "Занятие не было найдено", {variant: 'error'});
        }
      });
  }

  const createLesson = () => {
    const data = {
      group: hook.group,
      date: selectedDate.toISOString().slice(0, 10),
      time: getTime(),
      teacher: lector,
      earlyNotificationDate: earlyNotificationDate.toISOString(),
      earlyNotificationText,
      lecture,
      additional
    }
    fetch('/lessons/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          enqueueSnackbar("Успешно добавлено", {variant: 'success'});
          setHook("");
          setSearchValue("");
          setLecture("");
          setLector("");
          setAdditional("");
          setEarlyNotificationText("");
        } else {
          enqueueSnackbar(result.error, {variant: 'error'});
        }
      });
  }

  const turnChecked = () => {
    const result = !delayedDispatch
    setDelayedDispatch(result)
  }

  let delayedContainer = null;
  const showDelayedContainer = () => {
    if (delayedDispatch) {
      return delayedContainer = (
        <div className={classes.delayedDispatchContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              format="dd-MM-yyyy"
              autoOk={true}
              ampm={false}
              margin="normal"
              label="Дата предварительного анонса"
              disablePast={true}
              value={earlyNotificationDate}
              error={false}
              onChange={date => setEarlyNotificationDate(date)}
            />
          </MuiPickersUtilsProvider>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={5}
            rowsMax={10}
            placeholder="Текст сообщения"
            value={earlyNotificationText}
            onChange={event => setEarlyNotificationText(event.target.value)}
          />
        </div>
      );
    }
  }

  return (
    <HooksContext.Consumer>
      {data => (
        <div className={classes.page}>
          <div className={classes.column}>
            <h1>Конструктор сообщения:</h1>
            <div className={classes.messageConstructor}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="group"
                  options={data.hooks}
                  inputValue={searchValue}
                  onInputChange={(e, value) => setSearchValue(value)}
                  getOptionLabel={(h) => `Группа: "${h.group}", канал: "${h.channel}".`}
                  onChange={(event, value) => {
                    setSearchValue(value && `Группа: "${value.group}", канал: "${value.channel}".` || "");
                    setHook(value || {});
                  }}
                  style={{width: '100%'}}
                  renderInput={(params) => <TextField {...params} label="Группа/канал" variant="outlined"/>}
                />
              </FormControl>
              <TextField label="Название занятия" variant="outlined" value={lecture}
                         onChange={event => setLecture(event.target.value)}/>
              <Button variant="outlined" color="primary" onClick={getLastLesson}>
                Получить закреплённое занятие
                <Stars/>
              </Button>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant="inline"
                  format="dd-MM-yyyy HH:mm"
                  autoOk={true}
                  minutesStep={5}
                  ampm={false}
                  margin="normal"
                  label="Дата и время занятия"
                  disablePast={true}
                  value={selectedDate}
                  error={false}
                  onChange={date => setSelectedDate(date)}
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="Лектор"
                variant="outlined"
                value={lector}
                onChange={event => setLector(event.target.value)}
              />
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                rowsMax={10}
                placeholder="Обсуждаемые темы"
                value={additional}
                onChange={event => setAdditional(event.target.value)}
              />
            </div>
          </div>
          <div className={classes.column}>
            <h1>Результат сообщения:</h1>
            <h2>Группа: {hook.group || "не задана"}</h2>
            <h2>Сообщение:</h2>
            <pre className={classes.pre}>
{`@channel
Добрый день!
Сегодня, ${getDate()}, в ${getTime()} по московскому времени состоится занятие «${lecture}».
Ее проведет ${lector}.
${additional} \n\n
Ссылку на трансляцию вы найдете в личном кабинете и в письме, которое сегодня придет вам на почту за два часа до лекции.`}
        </pre>
            <FormControlLabel
              control={
                <Checkbox
                  checked={delayedDispatch}
                  onChange={turnChecked}
                  color="primary"
                />
              }
              label="Отложенная отправка"
            />
            {showDelayedContainer()}
            <Button
              variant="contained"
              className={delayedDispatch ? classes.sendButton2 : classes.sendButton}
              onClick={createLesson}>Создать занятие</Button>
          </div>
        </div>
      )}
    </HooksContext.Consumer>
  );
}

export default withSnackbar(AddLessonPage);
