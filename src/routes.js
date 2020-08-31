import {lazy} from 'react';
import ManagementUserAdd from "./views/pages/user-management/ManagementUserAdd";

const ManagementUserDetail = lazy(() => import('./views/pages/user-management/ManagementUserDetail'));
const ManagementUser = lazy(() => import('./views/pages/user-management/ManagementUser'));
const ManagementRole = lazy(() => import('./views/pages/user-management/ManagementRole'));
const Toaster = lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = lazy(() => import('./views/base/cards/Cards'));
const Carousels = lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = lazy(() => import('./views/base/navbars/Navbars'));
const Navs = lazy(() => import('./views/base/navs/Navs'));
const Paginations = lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = lazy(() => import('./views/base/switches/Switches'));

const Tabs = lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = lazy(() => import('./views/charts/Charts'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = lazy(() => import('./views/icons/flags/Flags'));
const Brands = lazy(() => import('./views/icons/brands/Brands'));
const Alerts = lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = lazy(() => import('./views/notifications/badges/Badges'));
const Modals = lazy(() => import('./views/notifications/modals/Modals'));
const Colors = lazy(() => import('./views/theme/colors/Colors'));
const Typography = lazy(() => import('./views/theme/typography/Typography'));
const Widgets = lazy(() => import('./views/widgets/Widgets'));
const Users = lazy(() => import('./views/users/Users'));
const User = lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/colors2', name: 'Colors2', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/user-management', name: 'User Management', component: ManagementUser, exact: true },
  { path: '/user-management/users', name: 'User', component: ManagementUser },
  { path: '/user-management/add-user', name: 'Add User', component: ManagementUserAdd },
  { path: '/user-management/roles', name: 'Role', component: ManagementRole },
  { path: '/user-management/users-id/:id', exact: true, name: 'User Detail', component: ManagementUserDetail },
];

export default routes;
