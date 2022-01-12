import CustomersPage from "../pages/CustomersPage";
import ItemManagement from "../pages/ItemManagement";
import ItemsInWarehouse from "../pages/ItemsInWarehouse"
import UsersPage from "../pages/UsersPage";
import Profile from "../pages/Profile";
import ApplicationManagement from "../pages/ApplicationManagement";
import WarehouseManagementPage from "../pages/WarehouseManagementPage";
import CarManagementPage from "../pages/CarManagementPage";
import PriceCalculationPage from "../pages/PriceCalculationPage";
import WriteOffManagement from "../pages/WriteOffManagement";

export const privateRoutes = [
    {path: "/profile", element: <Profile/>, exact: true},
    {path: "/customers", element: <CustomersPage/>, exact: true},
    {path: '/items', element: <ItemManagement/>, exact: true},
    {path: '/warehouseItems', element: <ItemsInWarehouse/>, exact: true},
    {path: '/users', element: <UsersPage/>, exact: true},
    {path: '/warehouseApplications', element: <ApplicationManagement searchScope={'warehouse'}/>, exact: true},
    {path: '/customerApplications', element: <ApplicationManagement searchScope={'customer'}/>, exact: true},
    {path: '/warehouses', element: <WarehouseManagementPage/>, exact: true},
    {path: '/categories', element: <PriceCalculationPage/>, exact: true},
    {path: '/customerCars', element: <CarManagementPage/>, exact: true},
    {path: '/directorWriteOffs', element: <WriteOffManagement searchScope={'all'}/>, exact: true},
    {path: '/dispatcherWriteOffs', element: <WriteOffManagement searchScope={'warehouse'}/>, exact: true},
    {path: '/driverWriteOffs', element: <WriteOffManagement searchScope={'car'}/>, exact: true}
]

export default function getRouteByRole(role){
    switch (role){
        case 'ROLE_SYSTEM_ADMIN': return '/customers'
        case 'ROLE_ADMIN': return  '/users'
        case 'ROLE_DISPATCHER': return '/warehouseApplications'
        case 'ROLE_LOGISTICS_SPECIALIST': return '/customerApplications' // should be edit to
        // WaybillManagementPage when its will be created
        case 'ROLE_DRIVER': // should be edit to
        // WaybillManagementPage when its will be created
        case 'ROLE_DIRECTOR': return '/categories'
    }
}