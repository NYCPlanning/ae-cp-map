import { LinkBtn, LinkBtnProps } from "./LinkBtn";

export interface ExportDataBtnProps extends LinkBtnProps {
  geographyFileName: string;
}

export function ExportDataBtn({
  geographyFileName,
  ...props
}: ExportDataBtnProps) {
  return (
    <LinkBtn
      href={`${import.meta.env.VITE_CPDB_DATA_URL}/${geographyFileName}.zip`}
      isExternal
      {...props}
    >
      Export Data
    </LinkBtn>
  );
}
