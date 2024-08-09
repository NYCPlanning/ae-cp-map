import numbro from "numbro";
import { format } from "date-fns";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@nycplanning/streetscape";
import { CapitalCommitment, CapitalCommitmentType } from "~/gen";

export interface CapitalCommitmentsTableProps {
  capitalCommitments: Array<CapitalCommitment>;
  capitalCommitmentTypes: Array<CapitalCommitmentType>;
}
export function CapitalCommitmentsTable({
  capitalCommitments,
  capitalCommitmentTypes,
}: CapitalCommitmentsTableProps) {
  return (
    <TableContainer
      backgroundColor={"gray.50"}
      overflowY={"auto"}
      padding={{ base: 3, lg: "unset" }}
    >
      <Table
        backgroundColor={"white"}
        textAlign="left"
        fontSize="xs"
        width={"100%"}
        sx={{ borderCollapse: "separate" }}
        borderRadius={10}
      >
        <Thead>
          <Tr textTransform={"uppercase"}>
            <Th padding={1} lineHeight={1.5}>
              Date
            </Th>
            <Th padding={1} lineHeight={1.5}>
              Description
            </Th>
            <Th padding={1} lineHeight={1.5}>
              Commitment
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {capitalCommitments.map((commitment) => (
            <Tr key={commitment.id} verticalAlign={"text-top"}>
              <Td padding={1} lineHeight={1.5}>
                {format(commitment.plannedDate, "MMM yyyy")}
              </Td>
              <Td padding={1} lineHeight={1.5} sx={{ textWrap: "wrap" }}>
                {capitalCommitmentTypes.find(
                  (type) => type.code === commitment.type,
                )?.description ?? commitment.type}
              </Td>
              <Td padding={1} lineHeight={1.5}>
                {numbro(commitment.totalValue)
                  .format({
                    average: true,
                    output: "currency",
                    mantissa: 2,
                  })
                  .toUpperCase()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
