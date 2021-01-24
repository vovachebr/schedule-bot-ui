import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import LessonCard from './lessonCard';

const Accordion = withStyles({
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
})(MuiAccordion);
  
const AccordionSummary = withStyles({
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
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
}))(MuiAccordionDetails);

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
        <Accordion square expanded={expanded === group} onChange={handleChange(group)}>
          <AccordionSummary aria-controls={`${group}-content`} id={`${group}-header`}>
          <Typography>Группа {group}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {groupLessons.map(lesson => <LessonCard lesson={lesson} onRemoveLesson={onRemoveLesson}/>)}
          </AccordionDetails>
        </Accordion>
      );
    }
    return accordions;
  }
  return (printAccordions());
}
