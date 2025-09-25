import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { baseUrl } from "@app/core/env";
import { Observable } from "rxjs";
import {   ICreateUserDataForm, IUserManagementDetails, IUsersManagement } from "../model/users-management-id";

@Injectable({
  providedIn: "root",
})
export class UsersManagementService {
  http = inject(HttpClient);

  disableUser(id: number): Observable<IUsersManagement> {
    return this.http.post<IUsersManagement>(`${baseUrl}api/users/${id}/delete`, {});
  }

  activeUser(id: number): Observable<IUsersManagement> {
    return this.http.post<IUsersManagement>(`${baseUrl}api/users/${id}/recover`, {});
  }

  getUser(id: number): Observable<IUserManagementDetails> {
    return this.http.get<IUserManagementDetails>(`${baseUrl}api/users/${id}`);
  }

  updateUser(id: number, password: string): Observable<IUserManagementDetails> {
    const formData = new FormData();
    formData.append('password',password)
    return this.http.post<IUserManagementDetails>(`${baseUrl}api/users/${id}`, formData);
  }

  getUsers(): Observable<IUsersManagement> {
    return this.http.get<IUsersManagement>(`${baseUrl}api/users`);
  }

  createUser(data: ICreateUserDataForm): Observable<IUserManagementDetails> {
    const formData = new FormData();
    formData.append('name',data.name)
    formData.append('email',data.email)
    formData.append('password',data.password)

    return this.http.post<IUserManagementDetails>(`${baseUrl}api/users`, data);
  }

 
}
