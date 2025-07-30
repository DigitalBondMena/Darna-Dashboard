import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("@demo/dashboard/default/default.component").then(
        (c) => c.DefaultComponent
      ),
  },
  {
    path: "hero",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("@demo/dashboard/hero/hero").then((c) => c.Hero),
      },
      {
        path: "view/:id",
        loadComponent: () =>
          import("@demo/dashboard/hero-details/hero-details").then(
            (c) => c.HeroDetails
          ),
        data: { mode: "view" },
      },
      {
        path: "create",
        loadComponent: () =>
          import("@demo/dashboard/hero-details/hero-details").then(
            (c) => c.HeroDetails
          ),
        data: { mode: "create" },
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("@demo/dashboard/hero-details/hero-details").then(
            (c) => c.HeroDetails
          ),
        data: { mode: "edit" },
      },
    ],
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("@demo/dashboard/about-us/about-us").then((c) => c.AboutUs),
  },
  {
    path: "features",
    loadChildren: () =>
      import("@features/dashboard/features/features.routes").then(
        (c) => c.featuresRoutes
      ),
  },
  {
    path: "partners",
    loadChildren: () =>
      import("@features/dashboard/partners/partners.routes").then(
        (c) => c.partnersRoutes
      ),
  },
  {
    path: "services",
    loadComponent: () =>
      import("@demo/dashboard/service/service").then((c) => c.Service),
  },
  {
    path: "projects",
    loadComponent: () =>
      import("@demo/dashboard/projects/projects").then((c) => c.Projects),
  },
  {
    path: "achievements",
    loadComponent: () =>
      import("@demo/dashboard/achievements/achievements").then(
        (c) => c.Achievements
      ),
  },
  {
    path: "contact-us",
    loadComponent: () =>
      import("@demo/dashboard/contact-us/contact-us").then((c) => c.ContactUs),
  },
  {
    path: "testimonials",
    loadComponent: () =>
      import("@demo/dashboard/testimonials/testimonials").then(
        (c) => c.Testimonials
      ),
  },
  {
    path: "projects",
    loadComponent: () =>
      import("@demo/dashboard/projects/projects").then((c) => c.Projects),
  },
];
