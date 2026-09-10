import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
  Switch,
  Select,
  RadioGroup,
  Radio,
} from "@nycplanning/streetscape";
import { SupportingLayersLegend } from "./SupportingLayersLegend";
import { HOUSING_GROWTH_LAYERS } from "~/utils/constants";
import { FormEvent } from "react";
import { useUpdateSearchParams } from "~/utils/utils";
import {
  HousingLayerQueryParams,
  SupportingLayerParamKey,
} from "~/utils/types";

export function SupportingLayersPanel() {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const supportingLayersParam = searchParams.get("supportingLayers");
  const supportingLayers =
    supportingLayersParam === null
      ? []
      : (supportingLayersParam.split(",") as SupportingLayerParamKey[]);
  const housingData =
    searchParams.get("housingData") === null
      ? "cd"
      : (searchParams.get(
        "housingData",
      ) as HousingLayerQueryParams["housingData"]);
  const housingRange =
    searchParams.get("housingRange") === null
      ? "projected"
      : (searchParams.get(
        "housingRange",
      ) as HousingLayerQueryParams["housingRange"]);

  return (
    <VStack
      padding={4}
      borderTop={"1px solid"}
      borderColor={"gray.200"}
      marginTop={3}
      alignItems={"start"}
    >
      <Heading fontSize={"xs"} fontWeight={700}>
        Supporting Layers
      </Heading>
      <AccordionItem border={"none"} width={"100%"}>
        <AccordionButton
          p={0}
          width={"100%"}
          aria-label="Toggle Housing Growth Supporting Layer options panel"
        >
          <HStack justifyContent={"space-between"} width={"100%"}>
            <HStack gap={2}>
              <Switch
                size={"sm"}
                isChecked={supportingLayers.includes("housing")}
                onChange={() => {
                  updateSearchParams({
                    supportingLayers: supportingLayers.includes("housing")
                      ? supportingLayers.length === 1
                        ? undefined
                        : supportingLayers.filter(
                          (layer) => layer !== "housing",
                        )
                      : [...supportingLayers, "housing"],
                  });
                }}
              />
              <Heading fontSize={"xs"} pb={0}>
                Housing Growth
              </Heading>
            </HStack>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel px={0} py={3} width={"100%"}>
          <Heading fontSize={"10px"} fontWeight={"700"} py={2}>
            Geographic Aggregates
          </Heading>
          <Select
            fontSize={"xs"}
            value={housingData}
            onChange={(e: FormEvent<HTMLSelectElement> | undefined) =>
              e &&
              updateSearchParams({
                housingData:
                  e.currentTarget.value === "cd"
                    ? undefined
                    : (e.currentTarget
                      .value as HousingLayerQueryParams["housingData"]),
              })
            }
            isCancellable={false}
            textOverflow={"ellipsis"}
          >
            <option value="cd">Community (CD)</option>
            <option value="nta">Neighborhood (NTA)</option>
            <option value="boro">Borough</option>
          </Select>
          <Text py={2} fontSize={"10px"}>
            See data aggregated at different geographic levels such as community
            district.
          </Text>
          <RadioGroup
            name={"chronological-options"}
            mx={2}
            value={housingRange}
            onChange={(e) =>
              e &&
              updateSearchParams({
                housingRange:
                  e === "projected"
                    ? undefined
                    : (e as HousingLayerQueryParams["housingRange"]),
              })
            }
          >
            <Stack gap={2}>
              <Radio name={"past"} size={"xs"} value={"past"}>
                <Text fontSize={"xs"} fontWeight={"500"}>
                  Past (Completed 2016-2025)
                </Text>
              </Radio>
              <SupportingLayersLegend
                housingData={housingData}
                slices={HOUSING_GROWTH_LAYERS[housingData]["past"]}
                display={housingRange === "past" ? "flex" : "none"}
              />
              <Radio name={"current"} size={"xs"} value={"current"}>
                <Text fontSize={"xs"} fontWeight={"500"}>
                  Current (Estimated 2025)
                </Text>
              </Radio>
              <SupportingLayersLegend
                housingData={housingData}
                slices={HOUSING_GROWTH_LAYERS[housingData]["current"]}
                display={housingRange === "current" ? "flex" : "none"}
              />
              <Radio name={"projected"} size={"xs"} value={"projected"}>
                <Text fontSize={"xs"} fontWeight={"500"}>
                  Projected (Potential 2035)
                </Text>
              </Radio>
              <SupportingLayersLegend
                housingData={housingData}
                slices={HOUSING_GROWTH_LAYERS[housingData]["projected"]}
                display={housingRange === "projected" ? "flex" : "none"}
              />
            </Stack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>
    </VStack>
  );
}
