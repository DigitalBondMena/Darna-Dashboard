import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { baseUrl } from "@app/core/env";
import { Observable } from "rxjs";
import { IProject, IProjectDetails, IProjectResponse } from "../model";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  http = inject(HttpClient);

  disableProject(id: number): Observable<IProject> {
    return this.http.post<IProject>(`${baseUrl}api/projects/${id}/delete`, {});
  }

  activeProject(id: number): Observable<IProject> {
    return this.http.post<IProject>(`${baseUrl}api/projects/${id}/recover`, {});
  }

  getProject(id: number): Observable<IProjectDetails> {
    return this.http.get<IProjectDetails>(`${baseUrl}api/projects/${id}`);
  }

  updateProject(
    id: number,
    data: IProjectDetails
  ): Observable<IProjectDetails> {
    return this.http.post<IProjectDetails>(
      `${baseUrl}api/projects/${id}`,
      data
    );
  }

  getProjects(): Observable<IProject> {
    return this.http.get<IProject>(`${baseUrl}api/projects`);
  }

  addProject(data: IProjectDetails): Observable<IProjectDetails> {
    return this.http.post<IProjectDetails>(`${baseUrl}api/projects`, data);
  }

  addUpdateProject(data: IProjectResponse, file?: File, id?: number) {
    const formData = new FormData();
    console.log(data);
    console.log(file);
    formData.append("en_alt_main_image", data.en_alt_main_image);
    formData.append("ar_alt_main_image", data.ar_alt_main_image);
    formData.append("main_image", data.main_image);
    formData.append("en_alt_banner_image", data.en_alt_banner_image);
    formData.append("ar_alt_banner_image", data.ar_alt_banner_image);
    formData.append("banner_image", data.banner_image);
    formData.append("main_file_link", data.main_file_link);
    formData.append("google_map_link", data.google_map_link);
    formData.append("en_form_first_input_info", data.en_form_first_input_info);
    formData.append("ar_form_first_input_info", data.ar_form_first_input_info);
    formData.append(
      "en_form_second_input_info",
      data.en_form_second_input_info
    );
    formData.append(
      "ar_form_second_input_info",
      data.ar_form_second_input_info
    );
    formData.append("en_title_form", data.en_title_form);
    formData.append("ar_title_form", data.ar_title_form);
    formData.append("en_description_form", data.en_description_form);
    formData.append("ar_description_form", data.ar_description_form);
    formData.append("en_project_name", data.en_project_name);
    formData.append("ar_project_name", data.ar_project_name);
    formData.append("en_small_text", data.en_small_text);
    formData.append("ar_small_text", data.ar_small_text);
    formData.append("en_project_title", data.en_project_title);
    formData.append("ar_project_title", data.ar_project_title);
    formData.append("en_project_description", data.en_project_description);
    formData.append("ar_project_description", data.ar_project_description);
    formData.append("en_script_text", data.en_script_text);
    formData.append("ar_script_text", data.ar_script_text);
    formData.append("en_meta_title", data.en_meta_title);
    formData.append("ar_meta_title", data.ar_meta_title);
    formData.append("en_meta_description", data.en_meta_description);
    formData.append("ar_meta_description", data.ar_meta_description);

    // Handle image file - this is why you need the check
    if (file) {
      // New file uploaded - use it
      formData.append("main_image", file);
    } else if (data.main_image) {
      // No new file, but there's existing image data - preserve it
      formData.append("main_image", data.main_image);
    }

    // Use FormData for HTTP requests (not the separate methods)
    if (id) {
      // Update existing blog
      return this.http.post<IProjectResponse>(
        `${baseUrl}api/projects/${id}`,
        formData
      );
    } else {
      // Create new blog
      return this.http.post<IProjectResponse>(
        `${baseUrl}api/projects`,
        formData
      );
    }
  }
}
