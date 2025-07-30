import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterModule } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IDataTestimonials } from "@app/features/dashboard/testimonials/models/testimonials";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TestimonialsService } from "./../../../features/dashboard/testimonials/services/testimonials";

@Component({
  selector: "app-testimonials",
  imports: [TableModule, ButtonModule, RouterLink, RouterModule],
  templateUrl: "./testimonials.html",
  styleUrl: "./testimonials.scss",
})
export class Testimonials implements OnInit {
  private route = inject(ActivatedRoute);

  testimonials!: IDataTestimonials[];

  baseUrl = baseUrl;

  featureService = inject(TestimonialsService);

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
    this.featureService.getTestimonials().subscribe((data) => {
      this.testimonials = data.data;
    });
  }
  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }
}
