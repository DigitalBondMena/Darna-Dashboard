import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import Material from "@primeuix/themes/material";
import { providePrimeNG } from "primeng/config";

// Available theme imports - uncomment the one you want to use
// import Aura from '@primeuix/themes/aura';     // Modern & clean
// import Material from '@primeuix/themes/material'; // Google Material Design
// import Nora from '@primeuix/themes/nora';     // Elegant & minimalist

// Define routes array here for now
import { Routes } from "@angular/router";
import { AdminComponent } from "@theme/layout/admin/admin.component";
import { GuestComponent } from "@theme/layout/guest/guest.component";
import { MessageService } from "primeng/api";
import { AuthGuard } from "./core/guards/auth.guard";
import { GuestGuard } from "./core/guards/guest.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: GuestComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("@features/dashboard/dashboard.routes").then(
            (r) => r.dashboardRoutes
          ),
      },
    ],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Material, // 🎨 Change this to: Aura, Material, or Nora
        options: {
          prefix: "p",
          darkModeSelector: ".p-dark",
          cssLayer: {
            name: "primeng",
            order: "tailwind-base, primeng, tailwind-utilities",
          },
        },
      },
      ripple: true,
    }),
  ],
};
