import CustomersPage from "../pages/CustomersPage";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from "../pages/ItemsInWarehouse"
import UsersPage from "../pages/UsersPage";

export const privateRoutes = [
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true},
    {path: '/users', element: <UsersPage/>, exact: true}
]