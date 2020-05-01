import React from 'react';

import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import { Refresh, DeleteForever } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        marginLeft: "5%",
        minWidth: 275,
        width: 300,
    },
    title: {
        fontSize: 14,
    },
    popover: {
      pointerEvents: 'none',
    }
});

function DataBaseInfo() {
  const classes = useStyles();
  const [dbInfo, setDbInfo] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const openPopup = Boolean(anchorEl);


  
  const getInfo = () => {
    fetch(`/getDatabaseStat`)
    .then(response => response.json())
    .then(result => {
      if(result.success){
        setDbInfo({
            busySize:result.busySize,
            allSize:result.allSize
        });
      }
    });
  }

  React.useEffect(() => {
    if(!dbInfo.busySize)
      getInfo()
  });

  const getSize = (size) => {
      const divided = size / 1024;
      if(divided < 1000){
        return Number(divided.toFixed(4))+"Kb";
      }else{
        return Number((divided / 1024).toFixed(4)) + "Mb";
      }
  }

  return (
    <>
      
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Информация о занятом месте в базе данных
          </Typography>{
              !dbInfo.busySize ? 
              <CircularProgress /> :
              <>
              Занято: {getSize(dbInfo.busySize)}<br/>
              Всего: {getSize(dbInfo.allSize)}<br/><br/>
              {Number((dbInfo.busySize / dbInfo.allSize) * 100).toFixed(4)}%
              </>
          }
        </CardContent>
        <CardActions>
          <Fab color="primary" size="small" onClick={() => {setDbInfo({}); getInfo()}}>
            <Refresh/>
          </Fab>
          <Button
            size="small"
            color="primary"
            endIcon={<DeleteForever />}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
              Удалить лишние данные
          </Button>

          <Popover
            open={openPopup}
            className={classes.popover}
            onClose={handlePopoverClose}
            disableRestoreFocus
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
          <Typography>
            Будут удалены только уже отправлены повторяющиеся анонсы к занятиям
          </Typography>
        </Popover>
        </CardActions>
      </Card>
    </>
  );
}

export default withSnackbar(DataBaseInfo);
