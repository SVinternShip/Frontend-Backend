/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
import Tables from "./views/Dashboard/Tables.js";
//import Profile from "views/Dashboard/Profile.js";
import SignIn from "./components/Sign/SignIn.js";
import SignUp from "./components/Sign/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
    GlobeIcon,
} from "./components/Icons/Icons";
import FileUpload from "./components/FileUpload/FileUpload";

var dashRoutes = [
    {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/home",
  },
  {
    path: "/fileupload",
    name: "File Upload",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color='inherit' />,
    secondaryNavbar: true,
    component: FileUpload,
    layout: "/home",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [

    ],
  },
];
export default dashRoutes;
