import { Hide, Show } from "@nycplanning/streetscape";
import {
  CapitalProjectsAccordionPanel,
  CapitalProjectsAccordionPanelProps,
} from "./CapitalProjectsAccordionPanel";
import {
  CapitalProjectsDrawer,
  CapitalProjectsDrawerProps,
} from "./CapitalProjectsDrawer";

export interface CapitalProjectsPanelProps
  extends CapitalProjectsAccordionPanelProps,
    CapitalProjectsDrawerProps {}

export function CapitalProjectsPanel(props: CapitalProjectsPanelProps) {
  return (
    <>
      <Show above="sm">
        <CapitalProjectsAccordionPanel
          capitalProjects={props.capitalProjects}
          agencies={props.agencies}
          district={props.district}
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
          district={props.district}
          capitalProjectsTotal={props.capitalProjectsTotal}
        >
          {props.children}
        </CapitalProjectsDrawer>
      </Hide>
    </>
  );
}
