import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { ICounterData } from "@app/features/dashboard/counter/models";
import { CounterService } from "@app/features/dashboard/counter/service/counter";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-counter",
  imports: [TableSharedModule, SelectModule],
  templateUrl: "./counter.html",
  styleUrl: "./counter.scss",
})
export class Counter {
  private route = inject(ActivatedRoute);

  counters!: ICounterData[];
  allCounters!: ICounterData[]; // Store original data

  baseUrl = baseUrl;

  counterService = inject(CounterService);

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
    this.counterService.getCounters().subscribe((data) => {
      this.allCounters = data.data; // Store original data
      this.counters = data.data;
      console.log(this.counters[0]);
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
      this.counters = [...this.allCounters];
    } else {
      // Filter blogs by status
      this.counters = this.allCounters.filter(
        (blog) => Number(blog.active_status) === Number(statusValue)
      );
    }
  }

  // Handle status change from dropdown
  onStatusChange(blogId: number, newStatus: number) {
    if (newStatus === 1) {
      // Activate blog
      this.counterService.activeCounter(blogId).subscribe(() => {
        this.refreshData();
      });
    } else {
      // Deactivate blog
      this.counterService.disableCounter(blogId).subscribe(() => {
        this.refreshData();
      });
    }
  }

  // Refresh data and reapply filter
  private refreshData() {
    this.counterService.getCounters().subscribe((data) => {
      this.allCounters = data.data;
      // Reapply current filter
      this.onStatusFilter(this.selectedStatusFilter);
    });
  }

  onDelete(id: number) {
    this.counterService.disableCounter(id).subscribe(() => {
      this.refreshData();
    });
  }

  onActive(id: number) {
    // Find the blog by slug to get the ID
    const counter = this.allCounters.find((b) => b.id === id);
    if (counter) {
      this.counterService.activeCounter(counter.id).subscribe(() => {
        this.refreshData();
      });
    }
  }
}
