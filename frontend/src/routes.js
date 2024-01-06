import React from "react";

const Home = React.lazy(() => import("./views/home/index"));

const routes = [{ path: "/home", exact: true, name: "Home", element: Home }];

export default routes;
