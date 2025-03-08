import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Accordion as MUIAccordion,
} from "@mui/material";

export const Accordion = ({
  headerContent,
  headerId,
  detailsId,
  actionsContent,
  children,
  expanded,
  onChange,
  expandIcon = <ArrowDropDown />,
}) => {
  return (
    <MUIAccordion
      className="lrr-react-accordion"
      expanded={expanded}
      onChange={onChange}
    >
      {headerContent && (
        <AccordionSummary
          id={headerId}
          aria-controls={detailsId}
          expandIcon={expandIcon}
        >
          {headerContent}
        </AccordionSummary>
      )}
      {children && (
        <AccordionDetails id={detailsId}>{children}</AccordionDetails>
      )}
      {actionsContent && (
        <AccordionActions className="px-4">{actionsContent}</AccordionActions>
      )}
    </MUIAccordion>
  );
};
