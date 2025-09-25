import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IAdminUser } from "@app/features/dashboard/users-management/model/users-management-id";
import { UsersManagementService } from "@app/features/dashboard/users-management/services/usersManagement";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";
import { MessageService } from "primeng/api";
import { SelectModule } from "primeng/select";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-users-management",
  imports: [TableSharedModule, SelectModule],
  templateUrl: "./users-management.html",
})
export class UsersManagement implements OnInit {
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  users!: IAdminUser[];
  allUsers!: IAdminUser[]; // Store original data
  baseUrl = baseUrl;
  heroService = inject(UsersManagementService);
  checked: boolean = false;

  // Add loading state for each toggle
  loadingToggles = new Set<number>(); // Using string since careers use slug

  // Status options for dropdown
  statusOptions = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  // Selected status filter
  selectedStatusFilter: number | null = null;

  getMode() {
    const mode = this.route.snapshot.queryParamMap.get("mode");
    return mode;
  }

  getSliderId() {
    const id = this.route.snapshot.queryParamMap.get("id");
    return id;
  }

  ngOnInit() {
    this.heroService.getUsers().subscribe((data) => {
      console.log(data);
      
      this.allUsers = data.data; // Store original data
      this.users = data.data;
      console.log(this.users[0]);
    });
  }

  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  // Check if a specific toggle is loading (using slug)
  isToggleLoading(userId: number): boolean {
    return this.loadingToggles.has(userId);
  }

  onToggleChange(user: IAdminUser) {
    // Prevent multiple clicks while loading
    if (this.isToggleLoading(user.id)) {
      return;
    }

    // Add loading state
    this.loadingToggles.add(user.id);

    // Optimistically update the UI
    const originalStatus = user.active_status;
    const newStatus = user.active_status === "1" ? "0" : "1";
    user.active_status = newStatus;

    const apiCall =
      originalStatus === "1"
        ? this.heroService.disableUser(user.id)
        : this.heroService.activeUser(user.id);

    apiCall
      .pipe(finalize(() => {this.loadingToggles.delete(user.id)})
      ).subscribe({
        next: (response) => {
          // Update with server response if available
          if (response.data && response.data.length > 0) {
            const updatedUser:any = response.data.find((c) => c.id === user.id);
            if (updatedUser) {
              user.active_status = updatedUser.active_status;
            }
          }

          // Show success notification
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: `User ${newStatus === "1" ? "activated" : "deactivated"} successfully`,
          });
        },
        error: (error) => {
          // Revert optimistic update on error
          user.active_status = originalStatus;
          console.error("Toggle failed:", error);

          // Show error notification
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update user status",
          });
        },
      });
  }

  onDelete(id: number) {
    const user = this.users.find((c) => c.id === id);
    if (user) {
      this.onToggleChange(user);
    }
  }

  onActive(id: number) {
    const career = this.users.find((c) => c.id === id);
    if (career) {
      this.onToggleChange(career);
    }
  }

  // Handle status filter change
  onStatusFilter(statusValue: number | null) {
    if (statusValue === null || statusValue === undefined) {
      // Show all careers when filter is cleared
      this.users = [...this.allUsers];
    } else {
      // Filter careers by status
      this.users = this.allUsers.filter(
        (career) => Number(career.active_status) === Number(statusValue)
      );
    }
  }
}
