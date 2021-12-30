import Logout from "../pages/Logout";
import CustomersPage from "../pages/CustomersPage";
import Login from "../pages/Login";
import ItemManagement from "../pages/ItemManagement";

export const privateRoutes = [
    {path: "/logout", element: <Logout/>, exact: true},
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', component: ItemManagement, exact: true}
]

export const publicRoutes = [
    {path: "/login", element: <Login/>, exact: true}
]