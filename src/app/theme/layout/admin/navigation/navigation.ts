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
  // 1. DASHBOARD - Always first for overview
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

  // 2. CONTENT MANAGEMENT - Core website content sections
  {
    id: "website-content",
    title: "Website Content",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "hero",
        title: "Hero Section",
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
    ],
  },

  // 3. CONTENT CREATION - Blog and dynamic content
  {
    id: "content-creation",
    title: "Content Creation",
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

  // 4. HR & RECRUITMENT
  {
    id: "human-resources",
    title: "Human Resources",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "careers",
        title: "Careers",
        type: "item",
        classes: "nav-item",
        url: "dashboard/careers",
        icon: "ti ti-briefcase",
      },
      {
        id: "careers-form",
        title: "Careers Form",
        type: "item",
        classes: "nav-item",
        url: "dashboard/careers-form",
        icon: "ti ti-user",
      },
    ],
  },

  // 5. SITE INFORMATION - Static pages and policies
  {
    id: "site-information",
    title: "Site Information",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "about-page",
        title: "About Page",
        type: "item",
        classes: "nav-item",
        url: "dashboard/about-page",
        icon: "ti ti-info-circle",
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
        id: "privacy-policy",
        title: "Privacy Policy",
        type: "item",
        classes: "nav-item",
        url: "dashboard/privacy-policy",
        icon: "pi pi-lock",
      },
    ],
  },

  // 6. TOOLS & UTILITIES - Banners, counters, and other tools
  {
    id: "tools-utilities",
    title: "Tools & Utilities",
    type: "group",
    icon: "icon-navigation",
    children: [
      {
        id: "banners",
        title: "Banners",
        type: "item",
        classes: "nav-item",
        url: "dashboard/banners",
        icon: "pi pi-image",
      },
      {
        id: "counter",
        title: "Counter",
        type: "item",
        classes: "nav-item",
        url: "dashboard/counters",
        icon: "pi pi-hashtag",
      },
      {
        id: "seo",
        title: "SEO",
        type: "item",
        classes: "nav-item",
        url: "dashboard/seo",
        icon: "pi pi-search",
      },
    ],
  },

  // COMMENTED SECTIONS - Uncomment when needed
  // {
  //   id: "projects",
  //   title: "Projects",
  //   type: "group",
  //   icon: "icon-navigation",
  //   children: [
  //     {
  //       id: "projects",
  //       title: "Projects",
  //       type: "item",
  //       classes: "nav-item",
  //       url: "dashboard/projects",
  //       icon: "ti ti-building",
  //     },
  //   ],
  // },
];
