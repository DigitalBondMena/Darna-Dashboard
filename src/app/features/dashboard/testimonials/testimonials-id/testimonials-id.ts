import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { IDataTestimonials } from "../models/testimonials";
import { TestimonialsService } from "../services/testimonials";

@Component({
  selector: "app-testimonials-id",
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    EditorModule,
    FileUploadModule,
    RouterLink,
  ],
  providers: [MessageService],
  templateUrl: "./testimonials-id.html",
  styleUrl: "./testimonials-id.scss",
})
export class TestimonialsId implements OnInit {
  private featureService = inject(TestimonialsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals for reactive state
  mode = signal<"create" | "edit" | "view">("create");
  featureId = signal<number | null>(null);
  isLoading = signal(false);

  testmonials!: IDataTestimonials;

  featureForm!: FormGroup;

  baseUrl = baseUrl;

  // Computed properties
  isEditMode = computed(() => this.mode() === "edit");
  isCreateMode = computed(() => this.mode() === "create");
  isViewMode = computed(() => this.mode() === "view");

  // Form validation including file check for create mode
  isFormValid = computed(() => {
    if (!this.testmonials) return false;

    const formValid = this.featureForm.valid;

    // In create mode, also require image file
    if (this.isCreateMode()) {
      return formValid;
    }

    // In edit/view mode, form validation is enough
    return formValid;
  });

  pageTitle = computed(() => {
    switch (this.mode()) {
      case "create":
        return "Create New feature";
      case "edit":
        return "Edit feature Mode";
      case "view":
        return "View feature Mode";
      default:
        return "feature Form";
    }
  });

  constructor() {
    // Effect to handle form enable/disable based on mode
    effect(() => {
      if (this.testmonials) {
        if (this.isViewMode()) {
          this.featureForm.disable();
        } else {
          this.featureForm.enable();
        }
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.setupRouteHandling();
  }

  private setupRouteHandling() {
    // Get route data for mode
    this.route.data.subscribe((data) => {
      const mode = data["mode"] || "create";
      this.mode.set(mode);
    });

    // Get route params for ID
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.featureId.set(+id);
        this.loadSliderData(+id);
      }
    });
  }

  initForm() {
    this.featureForm = this.fb.group({
      en_name: ["", [Validators.required, Validators.minLength(3)]],
      ar_name: ["", [Validators.required, Validators.minLength(3)]],
      en_job: ["", [Validators.required, Validators.minLength(3)]],
      ar_job: ["", [Validators.required, Validators.minLength(3)]],
      en_text: ["", [Validators.required, Validators.minLength(3)]],
      ar_text: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  loadSliderData(id?: number) {
    const sliderId = id || this.featureId() || 1;

    this.featureService.getTestimonialById(sliderId).subscribe({
      next: (data) => {
        this.testmonials = data.data;
        this.featureForm.patchValue({
          en_name: data.data.en_name,
          ar_name: data.data.ar_name,
          en_job: data.data.en_job,
          ar_job: data.data.ar_job,
          en_text: data.data.en_text,
          ar_text: data.data.ar_text,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Error loading Testimonials data:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load Testimonials data",
        });
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.featureForm.invalid || this.isViewMode()) return;

    this.isLoading.set(true);
    const formData = this.featureForm.value;

    if (this.isCreateMode()) {
      this.createTestimonial(formData);
    } else if (this.isEditMode()) {
      this.updateSliderHero();
    }
  }

  private createTestimonial(formData: IDataTestimonials) {
    this.featureService
      .addUpdateTestimonials(formData, this.testmonials.id)
      .subscribe({
        next: (data) => {
          console.log("Create successful:", data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Hero created successfully",
          });
          this.router.navigate(["/dashboard/features"]);
        },
        error: (error) => {
          console.error("Error creating features:", error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to create features",
          });
          this.isLoading.set(false);
        },
      });
  }

  updateSliderHero() {
    if (this.featureForm.valid) {
      this.isLoading.set(true);
      const formData = this.featureForm.value;

      // Pass the selected file if user uploaded a new one
      this.featureService
        .addUpdateTestimonials(formData, this.testmonials.id)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "feature updated successfully",
            });
            this.isLoading.set(false);
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to update Testimonials",
            });
            this.isLoading.set(false);
          },
        });
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail: "Please fill all required fields correctly",
      });
    }
  }

  onCancel() {
    this.router.navigate(["/dashboard/features"]);
  }

  onEditSlider() {
    if (this.featureId()) {
      this.router.navigate(["../../edit", this.featureId()], {
        relativeTo: this.route,
      });
    }
  }
}
