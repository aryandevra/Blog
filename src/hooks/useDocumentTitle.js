import { useEffect } from "react";
import { useMatches } from "react-router";

// Update the document title based on the active route
const useDocumentTitle = (appName = "Blog") => {
  const matches = useMatches();

  const title = matches[matches.length - 1]?.handle?.title || "Home";

  useEffect(() => {
    document.title = title === "Home" ? appName : `${title} - ${appName}`;
  }, [title, appName]);
};

export default useDocumentTitle;
