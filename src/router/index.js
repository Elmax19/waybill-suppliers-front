import Login from "../pages/Login";
import ItemManagement from "../pages/ItemManagement";

export const privateRoutes = [
    //{path: '/about', component: About, exact: true},
    {path: '/items', component: ItemManagement, exact: true},
    // {path: '/item/:id', component: ItemIdPage, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]