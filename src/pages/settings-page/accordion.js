import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import { DeleteForever } from '@material-ui/icons';

const useStyles = makeStyles({
  card: {
    margin: "0 10px 0 10px"
  },
  backgroundsList: {
    display: "flex",
    flexDirection: "column"
  },
  backgroundImageCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px"
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: 10
  }
});

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function Accordion() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("");
  const [teachersList, setTeachersList] = React.useState([]);
  const [backgroundsList, setBackgroundsList] = React.useState([]);
  const [logo, setLogo] = React.useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const openPopup = Boolean(anchorEl);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    fetch('/images/getNamesByType?type=преподаватель')
      .then(response => response.json())
      .then(result => setTeachersList(result.data || []));

    fetch('/images/getNamesByType?type=фон')
      .then(response => response.json())
      .then(result => setBackgroundsList(result.data || []));

    fetch('/images/getNamesByType?type=лого')
      .then(response => response.json())
      .then(result => setLogo(result.data[0].name));
  }, []);

  const removeImage = (name, setter) => {
    fetch('/images/removeImageByName?name='+name)
    .then(response => response.json())
    .then(result => {
      setter(result.data || []);
    });
  }

  return (
    <>
    <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Наша команда</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {
            teachersList.map(t => 
            <div key={t.name} className={classes.card}>
              <img 
                src={`/images/getImageByName?name=${t.name}`}
                width="100"
                height="100"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
              <Typography>{t.name}</Typography>
              <Popover
                open={openPopup}
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                onClose={handlePopoverClose}
                anchorEl={anchorEl}
                disableRestoreFocus
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  horizontal: 'center',
                }}
              >
                <Typography>
                  {t.position}
                </Typography>
              </Popover>
              <Fab color="primary" size="small" onClick={() => removeImage(t.name, setTeachersList)}>
                <DeleteForever />
              </Fab>
            </div>)
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Наши фоны для анонсов лекций</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.backgroundsList}>
          {
            backgroundsList.map(b => 
            <div key={b.name} className={classes.backgroundImageCard}>
              <img src={`/images/getImageByName?name=${b.name}`} width="760" height="365"/>
              <Typography>{b.name}</Typography>
              <Fab color="primary" size="small" onClick={() => removeImage(b, setBackgroundsList)}>
                <DeleteForever />
              </Fab>
            </div>)
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}