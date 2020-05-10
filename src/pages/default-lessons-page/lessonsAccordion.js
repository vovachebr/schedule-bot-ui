import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import LessonCard from './lessonCard';

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
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
}))(MuiExpansionPanelDetails);

export default function LessonsAccordion({lessons, onRemoveLesson}) {
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const printAccordions = () => {
    const accordions = [];
    for (const group in lessons) {
      const groupLessons = lessons[group];
      accordions.push(
        <ExpansionPanel square expanded={expanded === group} onChange={handleChange(group)}>
          <ExpansionPanelSummary aria-controls={`${group}-content`} id={`${group}-header`}>
          <Typography>Группа {group}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {groupLessons.map(lesson => <LessonCard lesson={lesson} onRemoveLesson={onRemoveLesson}/>)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
    return accordions;
  }
  return (printAccordions());
}
