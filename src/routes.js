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
import SynergyCreate from "./views/SynergyCreate"

//Journal
import JournalView from "./views/JournalView"
import JournalFeed from "./views/JournalFeed"

//Favorites
import Favorites from "./views/Favorites"

//About Us
import AboutUs from "./views/AboutUs"

//How it works
import HowItWorks from "./views/HowItWorks"


//Workout
import Workout from "./views/Workout"
import WorkoutEdit from "./views/WorkoutEdit"
import WorkoutCreate from "./views/WorkoutCreate"

//Success and cancel for paypal
import Success from "./views/Success"
import Cancel from "./views/Cancel"

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
    path:"/create/synergy",
    layout:DefaultLayout,
    component:SynergyCreate
  },
  {
    path:"/edit/synergy/:id",
    layout:DefaultLayout,
    component:SynergyEdit
  },
  {
    path:"/edit/workout/:id",
    layout:DefaultLayout,
    component:WorkoutEdit
  },
  {
    path:"/view/journal",
    layout:DefaultLayout,
    component:JournalView
  },
  {
    path:"/feed/journal",
    layout:DefaultLayout,
    component:JournalFeed
  },
  {
    path:"/favorites",
    layout:DefaultLayout,
    component:Favorites
  },
  {
    path:"/aboutus",
    layout:DefaultLayout,
    component:AboutUs
  },{
    path:"/howitworks",
    layout:DefaultLayout,
    component:HowItWorks
  },{
    path:"/workout",
    layout:DefaultLayout,
    component:Workout
  },
  {
    path:"/create/workout",
    layout:DefaultLayout,
    component:WorkoutCreate
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
  },
  // {
  //   path:"/success",
  //   // layout:DefaultLayout,
  //   component: Success
  // },{
  //   path:"/cancel",
  //   // layout:DefaultLayout,
  //   component: Cancel
  // }
];
