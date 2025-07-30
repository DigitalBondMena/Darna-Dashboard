import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { baseUrl } from "@app/core/env";
import { Observable } from "rxjs";
import { IData } from "../../hero/models";
import { IDataTestimonials, ITestimonials } from "../models/testimonials";

@Injectable({
  providedIn: "root",
})
export class TestimonialsService {
  http = inject(HttpClient);

  disableTestimonials(id: number): Observable<ITestimonials> {
    return this.http.post<ITestimonials>(
      `${baseUrl}api/testimonials/${id}/delete`,
      {}
    );
  }

  activeTestimonials(id: number): Observable<ITestimonials> {
    return this.http.post<ITestimonials>(
      `${baseUrl}api/testimonials/${id}/recover`,
      {}
    );
  }

  getTestimonialById(id: number): Observable<IDataTestimonials> {
    return this.http.get<IDataTestimonials>(`${baseUrl}api/testimonials/${id}`);
  }

  updateTestimonials(id: number, data: IData): Observable<ITestimonials> {
    return this.http.post<ITestimonials>(
      `${baseUrl}api/testimonials/${id}`,
      data
    );
  }

  getTestimonials(): Observable<ITestimonials> {
    return this.http.get<ITestimonials>(`${baseUrl}api/testimonials`);
  }

  addTestimonials(data: IData): Observable<ITestimonials> {
    return this.http.post<ITestimonials>(`${baseUrl}api/testimonials`, data);
  }

  addUpdateTestimonials(data: IData, id?: number) {
    const formData = new FormData();
    formData.append("en_name", data.en_title);
    formData.append("ar_name", data.ar_title);
    formData.append("en_job", data.en_description);
    formData.append("ar_job", data.ar_description);
    formData.append("en_text", data.en_alt_image);
    formData.append("ar_text", data.ar_alt_image);

    if (id) {
      return this.updateTestimonials(id, data);
    } else {
      return this.addTestimonials(data);
    }
  }
}
