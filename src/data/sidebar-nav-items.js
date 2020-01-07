export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Users",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/users",
    },
    {
      title: "Synergistic",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/synergistic",
    },
    {
      title: "Journal",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/view/journal",
    },
    {
      title: "Journal Feed",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/feed/journal",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
