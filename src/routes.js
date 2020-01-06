import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/BlogOverview";
import UserProfile from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
//User List
import Users from "./views/Users";

//Synergistic
import Synergistic from "./views/Synergistic"
import SynergyPost from "./views/SynergyView"
import SynergyEdit from "./views/SynergyEdit"

import BlogPosts from "./views/BlogPosts";
import Register from "./components/Register"
import Login from "./components/Login"


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/userprofile/:id",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/synergistic",
    layout: DefaultLayout,
    component: Synergistic
  },
  {
    path:"/view/synergy/:id",
    layout:DefaultLayout,
    component:SynergyPost
  },
  {
    path:"/edit/synergy/:id",
    layout:DefaultLayout,
    component:SynergyEdit
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/users",
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path:"/login2",
    layout:DefaultLayout,
    component: Login
  }
];
