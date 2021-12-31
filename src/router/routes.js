import Logout from "../pages/Logout";
import CustomersPage from "../pages/CustomersPage";
import Login from "../pages/Login";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from  "../pages/ItemsInWarehouse"

export const privateRoutes = [
    {path: "/logout", element: <Logout/>, exact: true},
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true}
]

export const publicRoutes = [
    {path: "/login", element: <Login/>, exact: true}
]