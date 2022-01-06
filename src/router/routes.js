import CustomersPage from "../pages/CustomersPage";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from "../pages/ItemsInWarehouse"
import UsersPage from "../pages/UsersPage";
import Profile from "../pages/Profile";
import Logout from "../pages/Logout";

export const privateRoutes = [
    // {path: "/logout", element: <Logout/>, exact: true},
    {path: "/profile", element: <Profile/>, exact: true},
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true},
    {path: '/users', element: <UsersPage/>, exact: true}
]