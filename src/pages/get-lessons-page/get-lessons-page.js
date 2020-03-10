import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles(theme => ({
  table: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%"
  },
  checkbox: {
    display: "flex"
  }
}));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function GetLessonsPage() {
  const classes = useStyles();

  const [lessons, setLessons] = React.useState();
  const [isSendLessons, changeIsSendLessons] = React.useState(false);
  const columns = [
    { title: 'Занятие', field: 'lecture' },
    { title: 'Дата', field: 'date' },
    { title: 'Время', field: 'time' },
    { title: 'Группа', field: 'group' },
    { title: 'Лектор', field: 'teacher' }
  ];

  const getLessons = (isSendLessons) => {
    fetch(`/lessons?isSent=${isSendLessons}`)
    .then(response => response.json())
    .then(result => setLessons(result.lessons));
  }
  
  React.useEffect(() => getLessons(isSendLessons), []);

  return (
    <div className={classes.table}>
      <FormControlLabel className={classes.checkbox}
        control={
          <Checkbox checked={isSendLessons} onChange={() => {
            getLessons(!isSendLessons)
            changeIsSendLessons(!isSendLessons)
          }} color="primary"/>
        }
        label={`Отображаются ${isSendLessons ? "" : "не"}отправленные уроки`}
      />
      <MaterialTable
        title="Занятия"
        icons={tableIcons}
        columns={columns}
        data={lessons}
        editable={{
          onRowDelete: oldData =>
          new Promise(resolve => {
            fetch('/lessons/remove', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: `{"id" : "${oldData.id}"}`
            })
            .then(response => response.json())
            .then(result => {
              setLessons(result.lessons);
              resolve(result.lessons);
            });
          })
          }}
      />
    </div>
  );
}

export default GetLessonsPage;
