import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Loading } from "../components/Loading";

export const PublicRoutes = ({authStatus}) => {
  return authStatus === "authenticated" ? <Navigate to={"/home"} /> : <Outlet />;
};