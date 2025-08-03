import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IData } from "@app/features/dashboard/hero/models";
import { HeroService } from "@app/features/dashboard/hero/services/hero";
import { NgxSpinnerService } from "ngx-spinner";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { ToggleSwitch } from "primeng/toggleswitch";

@Component({
  selector: "app-hero",
  imports: [
    TableModule,
    RouterLink,
    FormsModule,
    ToggleSwitch,
    SkeletonModule,
    ButtonModule,
  ],
  templateUrl: "./hero.html",
  styleUrl: "./hero.scss",
})
export class Hero implements OnInit {
  private route = inject(ActivatedRoute);

  sliders!: IData[];

  baseUrl = baseUrl;

  heroService = inject(HeroService);

  checked: boolean = false;

  getMode() {
    const mode = this.route.snapshot.queryParamMap.get("mode");
    return mode;
  }

  getSliderId() {
    const id = this.route.snapshot.queryParamMap.get("id");
    return id;
  }
  spinner = inject(NgxSpinnerService);

  ngOnInit() {
    this.spinner.show();

    this.heroService.getSliders().subscribe((data) => {
      this.sliders = data.data;
    });
  }
  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  onToggleChange(slider: IData) {
    console.log("Current slider status:", slider.active_status);
    if (Number(slider.active_status) === 1) {
      this.onDelete(slider.id);
    } else {
      this.onActive(slider.id);
    }
  }

  onDelete(id: number) {
    console.log("deleted", id);
    this.heroService.disableSlider(id).subscribe(() => {
      this.heroService.getSliders().subscribe((data) => {
        this.sliders = data.data;
      });
    });
  }
  onActive(id: number) {
    console.log("active", id);

    this.heroService.activeSlider(id).subscribe(() => {
      this.heroService.getSliders().subscribe((data) => {
        this.sliders = data.data;
      });
    });
  }
}
