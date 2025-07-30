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
    title: "sections",
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
        id: "partners",
        title: "Partners",
        type: "item",
        classes: "nav-item",
        url: "dashboard/partners",
        icon: "ti ti-users",
      },
      {
        id: "contact-us",
        title: "Contact Us",
        type: "item",
        classes: "nav-item",
        url: "dashboard/contact-us",
        icon: "ti ti-mail",
      },
      {
        id: "services",
        title: "Services",
        type: "item",
        classes: "nav-item",
        url: "dashboard/services",
        icon: "ti ti-briefcase",
      },
      {
        id: "projects",
        title: "Projects",
        type: "item",
        classes: "nav-item",
        url: "dashboard/projects  ",
        icon: "ti ti-building",
      },
      {
        id: "achievements",
        title: "Achievements",
        type: "item",
        classes: "nav-item",
        url: "dashboard/achievements",
        icon: "ti ti-award",
      },
      {
        id: "testimonials",
        title: "Testimonials",
        type: "item",
        classes: "nav-item",
      },
    ],
  },
];
