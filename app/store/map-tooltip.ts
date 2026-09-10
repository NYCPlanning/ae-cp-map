import { StateCreator } from "zustand";

interface HousingLayerMapTooltipProps {
  html: string;
  style?: Partial<CSSStyleDeclaration>;
}

export type MapTooltipStore = {
  hoveredItemId?: string;
  setHoveredItemId: (id: string | undefined) => void;
  housingLayerMapTooltip: HousingLayerMapTooltipProps;
  setHousingLayerMapTooltip: (tooltipBody: string) => void;
};

export const createMapTooltipStore: StateCreator<MapTooltipStore> = (set) => ({
  setHoveredItemId: (id: string | undefined) =>
    set(() => ({
      hoveredItemId: id,
    })),
  housingLayerMapTooltip: {
    html: "<></>",
    style: {
      display: "none",
    },
  },
  setHousingLayerMapTooltip: (tooltipBody: string) =>
    set(() => ({
      housingLayerMapTooltip: {
        html: `
              <div style="
                transform: translate(-50%, 8px);
                background-color: #FFFFFF;
                color: #4A5568;
                padding: 8px;
                max-width: 320px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                
                border-radius: 4px;
                box-shadow: 0 8px 4px 0 rgba(0, 0, 0, 0.08);
                white-space: wrap;
              ">
                ${tooltipBody}
              </div>
            `,
        style: {
          background: "transparent",
          padding: "0px",
          border: "none",
          boxShadow: "none",
        },
      },
    })),
});
