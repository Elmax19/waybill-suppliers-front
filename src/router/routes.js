import CustomersPage from "../pages/CustomersPage";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from "../pages/ItemsInWarehouse"
import UsersPage from "../pages/UsersPage";
import ApplicationManagement from "../pages/ApplicationManagement";

export const privateRoutes = [
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true},
    {path: '/users', element: <UsersPage/>, exact: true},
    {path: '/warehouseApplications', element: <ApplicationManagement searchScope={'warehouse'}/>, exact: true},
    {path: '/customerApplications', element: <ApplicationManagement searchScope={'customer'}/>, exact: true}
]