export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "default",
        title: "Dashboard",
        type: "item",
        classes: "nav-item",
        url: "dashboard",
        icon: "ti ti-dashboard",
        breadcrumbs: false,
      },
    ],
  },

  {
    id: "pages",
    title: "Home",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "hero",
        title: "Hero",
        type: "item",
        classes: "nav-item",
        url: "dashboard/hero",
        icon: "ti ti-home",
      },
      {
        id: "about-us",
        title: "About Us",
        type: "item",
        classes: "nav-item",
        url: "dashboard/about-us",
        icon: "ti ti-user",
      },
      {
        id: "features",
        title: "Features",
        type: "item",
        classes: "nav-item",
        url: "dashboard/features",
        icon: "pi pi-sparkles",
      },
      {
        id: "testimonials",
        title: "Testimonials",
        type: "item",
        classes: "nav-item",
        url: "dashboard/testimonials",
        icon: "pi pi-comments",
      },
      {
        id: "partners",
        title: "Partners",
        type: "item",
        classes: "nav-item",
        url: "dashboard/partners",
        icon: "ti ti-users",
      },
      {
        id: "testimonials",
        title: "Testimonials",
        type: "item",
        classes: "nav-item",
      },
    ],
  },

  // {
  //   id: "projects",
  //   title: "projects",
  //   type: "group",
  //   icon: "icon-navigation",
  //   children: [
  //     {
  //       id: "projects",
  //       title: "Projects",
  //       type: "item",
  //       classes: "nav-item",
  //       url: "dashboard/projects  ",
  //       icon: "ti ti-building",
  //     },
  //   ],
  // },

  // {
  //   id: "achievements",
  //   title: "achievements",
  //   type: "group",
  //   icon: "icon-navigation",
  //   children: [
  //     {
  //       id: "achievements",
  //       title: "Achievements",
  //       type: "item",
  //       classes: "nav-item",
  //       url: "dashboard/achievements",
  //       icon: "ti ti-award",
  //     },
  //   ],
  // },

  {
    id: "blogs",
    title: "blogs",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "blogs",
        title: "Blogs",
        type: "item",
        classes: "nav-item",
        url: "dashboard/blogs",
        icon: "pi pi-globe",
      },
    ],
  },

  {
    id: "careers",
    title: "careers",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "careers",
        title: "Careers",
        type: "item",
        classes: "nav-item",
        url: "dashboard/careers",
        icon: "ti ti-user",
      },
    ],
  },

  {
    id: "shared",
    title: "Shared",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "banner",
        title: "Banners",
        type: "item",
        classes: "nav-item",
        url: "dashboard/banners",
        icon: "pi pi-image",
      },
      {
        id: "seo",
        title: "Seo",
        type: "item",
        classes: "nav-item",
        url: "dashboard/seo",
        icon: "ti ti-search",
      },
    ],
  },

  {
    id: "aboutInfo",
    title: "about information",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "contact-us",
        title: "Contact Us",
        type: "item",
        classes: "nav-item",
        url: "dashboard/contact-us",
        icon: "ti ti-mail",
      },
      {
        id: "about-page",
        title: "About",
        type: "item",
        classes: "nav-item",
        url: "dashboard/about-page",
        icon: "ti ti-user",
      },
    ],
  },
];
