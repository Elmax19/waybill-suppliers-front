import CustomersPage from "../pages/CustomersPage";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from "../pages/ItemsInWarehouse"
import UsersPage from "../pages/UsersPage";
import Profile from "../pages/Profile";
import ApplicationManagement from "../pages/ApplicationManagement";
import WarehouseManagementPage from "../pages/WarehouseManagementPage";

export const privateRoutes = [
    {path: "/profile", element: <Profile/>, exact: true},
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true},
    {path: '/users', element: <UsersPage/>, exact: true},
    {path: '/warehouseApplications', element: <ApplicationManagement searchScope={'warehouse'}/>, exact: true},
    {path: '/customerApplications', element: <ApplicationManagement searchScope={'customer'}/>, exact: true},
    {path: '/warehouses', element: <WarehouseManagementPage/>, exact: true}
]