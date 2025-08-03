import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IProjectResponse } from "@app/features/dashboard/projects/model";
import { ProjectsService } from "@app/features/dashboard/projects/service/projects";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-projects",
  imports: [TableSharedModule, SelectModule],
  templateUrl: "./projects.html",
  styleUrl: "./projects.scss",
})
export class Projects implements OnInit {
  private route = inject(ActivatedRoute);

  projects!: IProjectResponse[];
  allProjects!: IProjectResponse[]; // Store original dat

  baseUrl = baseUrl;

  projectService = inject(ProjectsService);

  checked: boolean = false;

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

  // Get status option for dropdown display
  getStatusOption(status: number): number {
    return status;
  }

  // Handle status filter change
  onStatusFilter(statusValue: number | null) {
    if (statusValue === null || statusValue === undefined) {
      // Show all blogs when filter is cleared
      this.projects = [...this.allProjects];
    } else {
      // Filter blogs by status
      this.projects = this.allProjects.filter(
        (project) => Number(project.active_status) === Number(statusValue)
      );
    }
  }

  // Handle status change from dropdown
  onStatusChange(projectId: number, newStatus: number) {
    if (newStatus === 1) {
      // Activate blog
      this.projectService.activeProject(projectId).subscribe(() => {
        this.refreshData();
      });
    } else {
      // Deactivate blog
      this.projectService.disableProject(projectId).subscribe(() => {
        this.refreshData();
      });
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
    this.projectService.disableProject(id).subscribe(() => {
      this.refreshData();
    });
  }

  onActive(id: number) {
    // Find the project by slug to get the ID
    const project = this.allProjects.find((p) => p.id === id);
    if (project) {
      this.projectService.activeProject(project.id).subscribe(() => {
        this.refreshData();
      });
    }
  }
}
