import Logout from "../pages/Logout";
import CustomersPage from "../pages/CustomersPage";
import Login from "../pages/Login";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from  "../pages/ItemsInWarehouse"

export const privateRoutes = [
    {path: "/logout", component: Logout, exact: true},
    {path: "/customers", component: CustomersPage, exact: true},
    {path: '/items', component: ItemManagement, exact: true},
    {path: '/warehouseItems', component: ItemsInWarehouse, exact: true}
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]