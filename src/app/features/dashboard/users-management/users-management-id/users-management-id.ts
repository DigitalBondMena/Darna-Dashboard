import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { baseUrl } from "@app/core/env";
import { DetailsSharedModule } from "@app/theme/shared/module/shared/details-shared.module";
import { MessageService } from "primeng/api";
import { IAdminUser, ICreateUserDataForm } from "../model/users-management-id";
import { UsersManagementService } from "../services/usersManagement";

@Component({
  selector: "app-users-management-id",
  imports: [DetailsSharedModule],
  templateUrl: "./users-management-id.html",
  styleUrl: "./users-management-id.scss",
})
export class UsersManagement implements OnInit {
  private usersManagementService = inject(UsersManagementService);

  private fb = inject(FormBuilder);

  private messageService = inject(MessageService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  text: string | undefined;

  // Signals for reactive state
  mode = signal<"create" | "edit" | "view">("create");
  UserId = signal<number | null>(null);
  isLoading = signal(false);

  user!: IAdminUser;

  careerForm!: FormGroup;

  baseUrl = baseUrl;

  // Computed properties
  isEditMode = computed(() => this.mode() === "edit");
  isCreateMode = computed(() => this.mode() === "create");
  isViewMode = computed(() => this.mode() === "view");

  // Form validation including file check for create mode
  isFormValid = computed(() => {
    if (!this.user) return false;

    const formValid = this.careerForm.valid;

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
        return "Create New User";
      case "edit":
        return "Edit User Mode";
      case "view":
        return "View User Mode";
      default:
        return "User Form";
    }
  });

  constructor() {
    // Effect to handle form enable/disable based on mode
    effect(() => {
      if (this.user) {
        if (this.isViewMode()) {
          this.careerForm.disable();
        } else {
          this.careerForm.enable();
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
        this.UserId.set(+id);
        this.loadcareerData(+id);
      }
    });
  }

  initForm() {
    this.careerForm = this.fb.group({
      name:['', [Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  loadcareerData(id?: number) {
    const careerId = id || this.UserId() || 1;

    this.usersManagementService.getUser(careerId).subscribe({
      next: (data) => {
        this.user = data.data;
        console.log(this.user);
        
        this.user = data.data;
        this.careerForm.patchValue({
          name: data.data.name,
          email: data.data.email,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Error loading career data:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load User data",
        });
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {    
    if (this.careerForm.invalid || this.isViewMode()) return;

    this.isLoading.set(true);
    const formData = this.careerForm.value;

    if (this.isCreateMode()) {
      this.createUser(formData);
    } else if (this.isEditMode()) {
      this.updateCareer();
    }
  }

  private createUser(formData: ICreateUserDataForm) {
    this.usersManagementService.createUser(formData).subscribe({
      next: (data) => {
        console.log("Create successful:", data);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User created successfully",
        });
        this.router.navigate(["/dashboard/users-management"]);
      },
      error: (error) => {
        console.error("Error creating Careers:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to create User",
        });
        this.isLoading.set(false);
      },
    });
  }

  updateCareer() {
    console.log(this.careerForm);
    
    if (this.careerForm.valid) {
      this.isLoading.set(true);
      const password = this.careerForm.get('password').value;
      // Pass the selected file if user uploaded a new one
      this.usersManagementService.updateUser(this.user.id, password).subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User updated successfully",
          });
          this.isLoading.set(false);
        },
        error: () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update User",
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
    this.router.navigate(["/dashboard/users-management"]);
  }

  onEditcareer() {
    if (this.UserId()) {
      this.router.navigate(["../../edit", this.UserId()], {
        relativeTo: this.route,
      });
    }
  }
}
