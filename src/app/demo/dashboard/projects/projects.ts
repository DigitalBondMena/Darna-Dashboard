import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IProjectResponse } from "@app/features/dashboard/projects/model";
import { ProjectsService } from "@app/features/dashboard/projects/service/projects";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";
import { MessageService } from "primeng/api";
import { SelectModule } from "primeng/select";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-projects",
  imports: [TableSharedModule, SelectModule],
  templateUrl: "./projects.html",
  styleUrl: "./projects.scss",
})
export class Projects implements OnInit {
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  projects!: IProjectResponse[];
  allProjects!: IProjectResponse[]; // Store original data

  baseUrl = baseUrl;
  projectService = inject(ProjectsService);
  checked: boolean = false;

  // Add loading state for each toggle
  loadingToggles = new Set<number>();

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
    this.projectService.getProjects().subscribe((data) => {
      this.allProjects = data.data; // Store original data
      this.projects = data.data;
      console.log(this.projects[0]);
    });
  }

  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  // Check if a specific toggle is loading
  isToggleLoading(projectId: number): boolean {
    return this.loadingToggles.has(projectId);
  }

  onToggleChange(project: IProjectResponse) {
    // Prevent multiple clicks while loading
    if (this.isToggleLoading(project.id)) {
      return;
    }

    // Add loading state
    this.loadingToggles.add(project.id);

    // Optimistically update the UI
    const originalStatus = project.active_status;
    const newStatus = Number(project.active_status) === 1 ? "0" : "1";
    project.active_status = newStatus;

    // Update in both arrays
    const allProjectIndex = this.allProjects.findIndex(
      (p) => p.id === project.id
    );
    if (allProjectIndex !== -1) {
      this.allProjects[allProjectIndex].active_status = newStatus;
    }

    const apiCall =
      Number(originalStatus) === 1
        ? this.projectService.disableProject(project.id)
        : this.projectService.activeProject(project.id);

    apiCall
      .pipe(
        finalize(() => {
          // Remove loading state when done
          this.loadingToggles.delete(project.id);
        })
      )
      .subscribe({
        next: (response) => {
          // Update with server response if available
          if (response.data && response.data.length > 0) {
            const updatedProject = response.data.find(
              (p) => p.id === project.id
            );
            if (updatedProject) {
              project.active_status = updatedProject.active_status;
              // Update in allProjects as well
              if (allProjectIndex !== -1) {
                this.allProjects[allProjectIndex].active_status =
                  updatedProject.active_status;
              }
            }
          }

          // Show success notification
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: `Project ${Number(newStatus) === 1 ? "activated" : "deactivated"} successfully`,
          });
        },
        error: (error) => {
          // Revert optimistic update on error
          project.active_status = originalStatus;
          if (allProjectIndex !== -1) {
            this.allProjects[allProjectIndex].active_status = originalStatus;
          }
          console.error("Toggle failed:", error);

          // Show error notification
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update project status",
          });
        },
      });
  }

  // Get status option for dropdown display
  getStatusOption(status: number): number {
    return status;
  }

  // Handle status filter change
  onStatusFilter(statusValue: number | null) {
    if (statusValue === null || statusValue === undefined) {
      // Show all projects when filter is cleared
      this.projects = [...this.allProjects];
    } else {
      // Filter projects by status
      this.projects = this.allProjects.filter(
        (project) => Number(project.active_status) === Number(statusValue)
      );
    }
  }

  // Handle status change from dropdown
  onStatusChange(projectId: number) {
    const project = this.allProjects.find((p) => p.id === projectId);
    if (project) {
      this.onToggleChange(project);
    }
  }

  // Refresh data and reapply filter
  private refreshData() {
    this.projectService.getProjects().subscribe((data) => {
      this.allProjects = data.data;
      // Reapply current filter
      this.onStatusFilter(this.selectedStatusFilter);
    });
  }

  onDelete(id: number) {
    const project = this.allProjects.find((p) => p.id === id);
    if (project) {
      this.onToggleChange(project);
    }
  }

  onActive(id: number) {
    const project = this.allProjects.find((p) => p.id === id);
    if (project) {
      this.onToggleChange(project);
    }
  }
}
