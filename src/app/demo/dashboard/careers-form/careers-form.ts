import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { ICareersFormData } from "@app/features/dashboard/careers-form/model";
import { CareersFormService } from "@app/features/dashboard/careers-form/service/careers-form";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";

@Component({
  selector: "app-careers-form",
  imports: [TableSharedModule],
  templateUrl: "./careers-form.html",
  styleUrl: "./careers-form.scss",
})
export class CareersForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  careerForm!: ICareersFormData[];

  baseUrl = baseUrl;

  careerFormService = inject(CareersFormService);

  checked: boolean = false;

  getMode() {
    const mode = this.route.snapshot.queryParamMap.get("mode");
    return mode;
  }

  getSliderId() {
    const id = this.route.snapshot.queryParamMap.get("id");
    return id;
  }

  ngOnInit() {
    this.careerFormService.getCareersFormList().subscribe((data) => {
      this.careerForm = data.data;
      console.log(this.careerForm[0]);
    });
  }

  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  onRead(id: number) {
    // Navigate to the career form details view
    this.router.navigate(["/dashboard/careers-form/view", id]);
  }

  onEdit(id: number) {
    // Navigate to the career form edit view
    this.router.navigate(["/dashboard/careers-form/edit", id]);
  }

  getStatusLabel(status: number): string {
    return status === 1 ? "Read" : "Unread";
  }

  getStatusSeverity(status: number): string {
    return status === 1 ? "success" : "warning";
  }
}
