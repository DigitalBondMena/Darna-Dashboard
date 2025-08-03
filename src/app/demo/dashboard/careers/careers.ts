import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { ICareer } from "@app/features/dashboard/careers/model/career";
import { CareersService } from "@app/features/dashboard/careers/services/careers";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";

@Component({
  selector: "app-careers",
  imports: [TableSharedModule],
  templateUrl: "./careers.html",
  styleUrl: "./careers.scss",
})
export class Careers implements OnInit {
  private route = inject(ActivatedRoute);

  careers!: ICareer[];

  baseUrl = baseUrl;

  heroService = inject(CareersService);

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
    this.heroService.getCareers().subscribe((data) => {
      this.careers = data.data;
      console.log(this.careers[0]);
    });
  }
  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  onDelete(id: number) {
    this.heroService.disableCareer(id).subscribe(() => {
      this.heroService.getCareers().subscribe((data) => {
        this.careers = data.data;
      });
    });
  }
  onActive(id: number) {
    this.heroService.activeCareer(id).subscribe(() => {
      this.heroService.getCareers().subscribe((data) => {
        this.careers = data.data;
      });
    });
  }
}
