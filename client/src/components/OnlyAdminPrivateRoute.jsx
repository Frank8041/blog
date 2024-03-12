// protect the profile such that when u aint an admin u cant access the dashb

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" /> ;
}
