import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IBlogData } from "@app/features/dashboard/blogs/model/blog";
import { BlogService } from "@app/features/dashboard/blogs/service/blog";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-blogs",
  imports: [TableSharedModule, SelectModule],
  templateUrl: "./blogs.html",
  styleUrl: "./blogs.scss",
})
export class Blogs implements OnInit {
  private route = inject(ActivatedRoute);

  blogs!: IBlogData[];
  allBlogs!: IBlogData[]; // Store original data

  baseUrl = baseUrl;

  blogService = inject(BlogService);

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
    this.blogService.getBlogs().subscribe((data) => {
      this.allBlogs = data.data; // Store original data
      this.blogs = data.data;
      console.log(this.blogs[0]);
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
      this.blogs = [...this.allBlogs];
    } else {
      // Filter blogs by status
      this.blogs = this.allBlogs.filter(
        (blog) => Number(blog.active_status) === Number(statusValue)
      );
    }
  }

  // Handle status change from dropdown
  onStatusChange(blogId: number, newStatus: number) {
    if (newStatus === 1) {
      // Activate blog
      this.blogService.activeBlog(blogId).subscribe(() => {
        this.refreshData();
      });
    } else {
      // Deactivate blog
      this.blogService.disableBlog(blogId).subscribe(() => {
        this.refreshData();
      });
    }
  }

  // Refresh data and reapply filter
  private refreshData() {
    this.blogService.getBlogs().subscribe((data) => {
      this.allBlogs = data.data;
      // Reapply current filter
      this.onStatusFilter(this.selectedStatusFilter);
    });
  }

  onDelete(id: number) {
    this.blogService.disableBlog(id).subscribe(() => {
      this.refreshData();
    });
  }

  onActive(slug: string) {
    // Find the blog by slug to get the ID
    const blog = this.allBlogs.find((b) => b.en_slug === slug);
    if (blog) {
      this.blogService.activeBlog(blog.id).subscribe(() => {
        this.refreshData();
      });
    }
  }
}
