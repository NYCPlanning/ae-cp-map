import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { ReactNode } from "react";

export function AdminErrorBoundary({ children }: { children: ReactNode }) {
  console.debug("is this thing on?");
  const error = useRouteError();
  console.debug("error", error);
  console.debug("is error response", isRouteErrorResponse(error));

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
