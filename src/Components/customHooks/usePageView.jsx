import { useEffect } from "react";
import ReactGA from "react-ga4";

function usePageView(path) {
  useEffect(() => {
    console.log(path);
    const pagePath = path || window.location.pathname;
    ReactGA.send({
      hitType: "pageview",
      page: pagePath,
      title: "User Page Count",
    });
  }, [path]);
}

export default usePageView;
