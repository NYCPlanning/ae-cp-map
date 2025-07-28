import { Hide, Show } from "@nycplanning/streetscape";
import {
  CapitalProjectsAccordionPanel,
  CapitalProjectsAccordionPanelProps,
} from "./CapitalProjectsAccordionPanel";
import {
  CapitalProjectsDrawer,
  CapitalProjectsDrawerProps,
} from "./CapitalProjectsDrawer";
import { showRedesign } from "~/utils/envFlags";

export interface CapitalProjectsPanelProps
  extends CapitalProjectsAccordionPanelProps,
    CapitalProjectsDrawerProps {}

export function CapitalProjectsPanel(props: CapitalProjectsPanelProps) {
  return (
    <>
      {showRedesign ? (
        <CapitalProjectsAccordionPanel
          capitalProjects={props.capitalProjects}
          agencies={props.agencies}
          capitalProjectsTotal={props.capitalProjectsTotal}
          agencyBudgets={props.agencyBudgets}
        >
          {props.children}
        </CapitalProjectsAccordionPanel>
      ) : (
        <>
          <Show above="sm">
            <CapitalProjectsAccordionPanel
              capitalProjects={props.capitalProjects}
              agencies={props.agencies}
              capitalProjectsTotal={props.capitalProjectsTotal}
            >
              {props.children}
            </CapitalProjectsAccordionPanel>
          </Show>
          <Hide above="sm">
            <CapitalProjectsDrawer
              capitalProjects={props.capitalProjects}
              agencies={props.agencies}
              agencyBudgets={props.agencyBudgets}
              capitalProjectsTotal={props.capitalProjectsTotal}
            >
              {props.children}
            </CapitalProjectsDrawer>
          </Hide>
        </>
      )}
    </>
  );
}
