import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 370,
      backgroundColor: 'lightgray'
    },
    title: {
      fontSize: 14,
    },
});

export default function DefaultImages() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Обязательные изображения
          </Typography>
          <div>
            <img src={'/images/getImageByName?name=logo'} width={250} alt="логотип"/>
            <img src={'/images/getImageByName?name=default'} width={150} alt="преподаватель без аватарки"/>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
