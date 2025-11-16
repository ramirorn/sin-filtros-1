// import { use, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
// import { Loading } from "../components/Loading";

export const PrivateRoutes = ({ authStatus }) => {
  return authStatus === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};
