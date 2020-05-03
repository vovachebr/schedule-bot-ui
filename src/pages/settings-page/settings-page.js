import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import DataBaseInfo from './databaseInfo';
import Accordion from './accordion';

const useStyles = makeStyles((theme) => ({
    root:{
      width: "90%",
      marginTop: "2%",
      marginLeft: "5%"
    }
}));

export default function SettingsPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <DataBaseInfo />
       <Accordion />
    </div>
  );
}
