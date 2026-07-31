import { Link, Text, useToast } from "@nycplanning/streetscape";
import { LinkBtn } from "../LinkBtn";
import { format } from "date-fns";

export interface ExportDataModalLinkButtonProps {
  downloadLink: string;
  zeroTotalRecords: boolean;
}

export function ExportDataModalLinkButton({
  downloadLink,
  zeroTotalRecords,
}: ExportDataModalLinkButtonProps) {
  const toast = useToast();

  const onClick = () => {
    let filename = `CPP_Export_${format(new Date(), "dd_LLL_yyyy")}.csv`;

    const downloadPromise = fetch(downloadLink)
      .then((response) => {
        if (!response.ok) throw new Error("Network response failed");

        const disposition = response.headers.get("Content-Disposition");
        if (disposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });

    // Will display the loading toast until the promise is either resolved
    // or rejected.
    toast.promise(downloadPromise, {
      success: {
        position: "bottom-right",
        isClosable: true,
        title: "Success!",
        description: "Export saved to your downloads folder.",
        duration: 10000,
      },
      error: {
        position: "bottom-right",
        isClosable: true,
        title: "Sorry, we can't export this right now",
        description: (
          <Text>
            Need help?{" "}
            <Link
              href="mailto:CAPS@planning.nyc.gov"
              textDecoration={"underline"}
              color={"primary.600"}
            >
              E-mail us
            </Link>
            .
          </Text>
        ),
        duration: null,
      },
      loading: {
        position: "bottom-right",
        isClosable: true,
        title: "Exporting...",
        description: "Please wait.",
        duration: null,
      },
    });
  };

  return (
    <LinkBtn
      width={"full"}
      textAlign={"center"}
      fontWeight={"bold"}
      aria-disabled={zeroTotalRecords}
      cursor={"pointer"}
      onClick={onClick}
    >
      Export Selection <span style={{ fontWeight: 400 }}>(CSV)</span>
    </LinkBtn>
  );
}
