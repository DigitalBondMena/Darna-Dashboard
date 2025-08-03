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
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { ToastModule } from "primeng/toast";

import { baseUrl } from "@app/core/env";
import { IProjectResponse } from "../model";
import { ProjectsService } from "../service/projects";

@Component({
  selector: "app-project-id",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    FileUploadModule,
    EditorModule,
    ToastModule,
  ],
  templateUrl: "./project-id.html",
  styleUrl: "./project-id.scss",
  providers: [MessageService],
})
export class ProjectId implements OnInit {
  private projectService = inject(ProjectsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  mode = signal<"create" | "edit" | "view">("create");
  projectId = signal<number | null>(null);
  isLoading = signal(false);
  project!: IProjectResponse;
  projectForm!: FormGroup;
  baseUrl = baseUrl;

  selectedMainImage: File | null = null;
  selectedBannerImage: File | null = null;

  isEditMode = computed(() => this.mode() === "edit");
  isCreateMode = computed(() => this.mode() === "create");
  isViewMode = computed(() => this.mode() === "view");

  // Form validation including file check for create mode
  isFormValid = computed(() => {
    if (!this.projectForm) return false;

    const formValid = this.projectForm.valid;

    // In create mode, also require main image file
    if (this.isCreateMode()) {
      return formValid && !!this.selectedMainImage;
    }
    // In edit/view mode, form validation is enough
    return formValid;
  });

  pageTitle = computed(() => {
    switch (this.mode()) {
      case "create":
        return "Create New Project";
      case "edit":
        return "Edit Project";
      case "view":
        return "View Project";
      default:
        return "Project Form";
    }
  });

  constructor() {
    // Effect to handle form enable/disable based on mode
    effect(() => {
      if (this.projectForm) {
        if (this.isViewMode()) {
          this.projectForm.disable();
        } else {
          this.projectForm.enable();
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
        this.projectId.set(+id);
        this.loadProjectData(+id);
      }
    });
  }

  initForm() {
    this.projectForm = this.fb.group({
      en_project_name: ["", [Validators.required]],
      ar_project_name: ["", [Validators.required]],
      en_project_title: ["", [Validators.required]],
      ar_project_title: ["", [Validators.required]],
      en_project_description: ["", [Validators.required]],
      ar_project_description: ["", [Validators.required]],
      en_small_text: ["", [Validators.required]],
      ar_small_text: ["", [Validators.required]],
      en_alt_main_image: ["", [Validators.required]],
      ar_alt_main_image: ["", [Validators.required]],
      en_alt_banner_image: ["", [Validators.required]],
      ar_alt_banner_image: ["", [Validators.required]],
      main_file_link: [""],
      google_map_link: [""],
      en_form_first_input_info: [""],
      ar_form_first_input_info: [""],
      en_form_second_input_info: [""],
      ar_form_second_input_info: [""],
      en_title_form: [""],
      ar_title_form: [""],
      en_description_form: [""],
      ar_description_form: [""],
      en_script_text: [""],
      ar_script_text: [""],
      en_meta_title: ["", [Validators.required]],
      ar_meta_title: ["", [Validators.required]],
      en_meta_description: ["", [Validators.required]],
      ar_meta_description: ["", [Validators.required]],
    });
  }

  loadProjectData(id?: number) {
    const projectId = id || this.projectId() || 1;

    this.projectService.getProject(projectId).subscribe({
      next: (data) => {
        this.project = data.data;
        this.projectForm.patchValue({
          en_project_name: this.project.en_project_name,
          ar_project_name: this.project.ar_project_name,
          en_project_title: this.project.en_project_title,
          ar_project_title: this.project.ar_project_title,
          en_project_description: this.project.en_project_description,
          ar_project_description: this.project.ar_project_description,
          en_small_text: this.project.en_small_text,
          ar_small_text: this.project.ar_small_text,
          en_alt_main_image: this.project.en_alt_main_image,
          ar_alt_main_image: this.project.ar_alt_main_image,
          en_alt_banner_image: this.project.en_alt_banner_image,
          ar_alt_banner_image: this.project.ar_alt_banner_image,
          main_file_link: this.project.main_file_link,
          google_map_link: this.project.google_map_link,
          en_form_first_input_info: this.project.en_form_first_input_info,
          ar_form_first_input_info: this.project.ar_form_first_input_info,
          en_form_second_input_info: this.project.en_form_second_input_info,
          ar_form_second_input_info: this.project.ar_form_second_input_info,
          en_title_form: this.project.en_title_form,
          ar_title_form: this.project.ar_title_form,
          en_description_form: this.project.en_description_form,
          ar_description_form: this.project.ar_description_form,
          en_script_text: this.project.en_script_text,
          ar_script_text: this.project.ar_script_text,
          en_meta_title: this.project.en_meta_title,
          ar_meta_title: this.project.ar_meta_title,
          en_meta_description: this.project.en_meta_description,
          ar_meta_description: this.project.ar_meta_description,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Error loading project data:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load project data",
        });
        this.isLoading.set(false);
      },
    });
  }

  onMainImageSelect(event: { files?: File[]; currentFiles?: File[] }) {
    const files = event.files || event.currentFiles;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        this.messageService.add({
          severity: "error",
          summary: "Invalid File",
          detail: "Please select an image file",
        });
        return;
      }

      if (file.size > 5000000) {
        this.messageService.add({
          severity: "error",
          summary: "File Too Large",
          detail: "Please select an image smaller than 5MB",
        });
        return;
      }

      this.selectedMainImage = file;
      this.messageService.add({
        severity: "success",
        summary: "File Selected",
        detail: `Main image "${file.name}" selected successfully`,
      });
    }
  }

  onBannerImageSelect(event: { files?: File[]; currentFiles?: File[] }) {
    const files = event.files || event.currentFiles;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        this.messageService.add({
          severity: "error",
          summary: "Invalid File",
          detail: "Please select an image file",
        });
        return;
      }

      if (file.size > 5000000) {
        this.messageService.add({
          severity: "error",
          summary: "File Too Large",
          detail: "Please select an image smaller than 5MB",
        });
        return;
      }

      this.selectedBannerImage = file;
      this.messageService.add({
        severity: "success",
        summary: "File Selected",
        detail: `Banner image "${file.name}" selected successfully`,
      });
    }
  }

  onSubmit() {
    if (!this.isFormValid() || this.isViewMode()) {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail:
          this.isCreateMode() && !this.selectedMainImage
            ? "Please select a main image file and fill all required fields"
            : "Please fill all required fields correctly",
      });
      return;
    }

    this.isLoading.set(true);
    const formData = this.projectForm.value;

    if (this.isCreateMode()) {
      this.createProject(formData);
    } else if (this.isEditMode()) {
      this.updateProject();
    }
  }

  private createProject(formData: Partial<IProjectResponse>) {
    if (!this.selectedMainImage) {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail: "Please select a main image file",
      });
      this.isLoading.set(false);
      return;
    }

    this.projectService
      .addUpdateProject(formData as IProjectResponse, this.selectedMainImage)
      .subscribe({
        next: (data) => {
          console.log("Create successful:", data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Project created successfully",
          });
          this.router.navigate(["/dashboard/projects"]);
        },
        error: (error) => {
          console.error("Error creating project:", error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to create project",
          });
          this.isLoading.set(false);
        },
      });
  }

  updateProject() {
    this.isLoading.set(true);
    const formData = this.projectForm.value;

    this.projectService
      .addUpdateProject(
        formData as IProjectResponse,
        this.selectedMainImage || undefined,
        this.project.id
      )
      .subscribe({
        next: (data) => {
          console.log("Update successful:", data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Project updated successfully",
          });
          this.loadProjectData();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error("Error updating project:", error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update project",
          });
          this.isLoading.set(false);
        },
      });
  }

  onCancel() {
    this.router.navigate(["/dashboard/projects"]);
  }

  onEditProject() {
    if (this.projectId()) {
      this.router.navigate(["../../edit", this.projectId()], {
        relativeTo: this.route,
      });
    }
  }
}
