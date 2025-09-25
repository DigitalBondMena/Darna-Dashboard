import { Routes } from "@angular/router";

export const usersManagementRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("@demo/dashboard/users-management/users-management").then((m) => m.UsersManagement),
  },
  {
    path: "view/:id",
    loadComponent: () =>
      import("@app/features/dashboard/users-management/users-management-id/users-management-id").then(
        (c) => c.UsersManagement
      ),
    data: { mode: "view" },
  },
  {
    path: "create",
    loadComponent: () =>
      import("@features/dashboard/users-management/users-management-id/users-management-id").then(
        (c) => c.UsersManagement
      ),
    data: { mode: "create" },
  },
  {
    path: "edit/:id",
    loadComponent: () =>
      import("@features/dashboard/users-management/users-management-id/users-management-id").then(
        (c) => c.UsersManagement
      ),
    data: { mode: "edit" },
  },
];
