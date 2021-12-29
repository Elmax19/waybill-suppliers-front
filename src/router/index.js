import Login from "../pages/Login";
import ItemManagement from "../pages/ItemManagement";

export const privateRoutes = [
    {path: '/items', component: ItemManagement, exact: true}
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true}
]