import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IPartnerData } from "@app/features/dashboard/partners/models/partners";
import { PartnersService } from "@app/features/dashboard/partners/services/partners";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { ToggleSwitch } from "primeng/toggleswitch";

@Component({
  selector: "app-partners",
  imports: [
    TableModule,
    RouterLink,
    FormsModule,
    ToggleSwitch,
    SkeletonModule,
    ButtonModule,
  ],
  templateUrl: "./partners.html",
  styleUrl: "./partners.scss",
})
export class Partners implements OnInit {
  private route = inject(ActivatedRoute);

  partners!: IPartnerData[];

  baseUrl = baseUrl;

  partnersService = inject(PartnersService);

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
    this.partnersService.getPartners().subscribe((data) => {
      this.partners = data.data;
    });
  }
  returnStatus(status: number): boolean {
    if (status == 1) {
      return true;
    }
    return false;
  }

  onDelete(id: number) {
    this.partnersService.disablePartner(id).subscribe(() => {
      this.partnersService.getPartners().subscribe((data) => {
        this.partners = data.data;
      });
    });
  }
  onActive(id: number) {
    this.partnersService.activePartner(id).subscribe(() => {
      this.partnersService.getPartners().subscribe((data) => {
        this.partners = data.data;
      });
    });
  }
}
