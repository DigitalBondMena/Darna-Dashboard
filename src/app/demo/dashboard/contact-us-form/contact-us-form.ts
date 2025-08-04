import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { IContactUsForm } from "@app/features/dashboard/contact-us-form-id/model";
import { ContactUsFormService } from "@app/features/dashboard/contact-us-form-id/service/contact-us-form";
import { TableSharedModule } from "@app/theme/shared/module/shared/table-shared.module";

@Component({
  selector: "app-contact-us-form",
  imports: [TableSharedModule],
  templateUrl: "./contact-us-form.html",
  styleUrl: "./contact-us-form.scss",
})
export class ContactUsForm implements OnInit {
  private route = inject(ActivatedRoute);

  contactUsForm!: IContactUsForm[];

  baseUrl = baseUrl;

  contactUsFormService = inject(ContactUsFormService);

  getMode() {
    const mode = this.route.snapshot.queryParamMap.get("mode");
    return mode;
  }

  getSliderId() {
    const id = this.route.snapshot.queryParamMap.get("id");
    return id;
  }

  ngOnInit() {
    this.contactUsFormService.getContactUsForm().subscribe((data) => {
      this.contactUsForm = data.data;
    });
  }
}
