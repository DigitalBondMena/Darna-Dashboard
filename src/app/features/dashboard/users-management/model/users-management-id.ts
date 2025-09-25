





// ----------------
export interface IUsersManagement {
  success: boolean
  message: string
  data: IAdminUser[]
}

export interface IAdminUser {
  id: number
  name: string
  email: string
  phone?: string
  device_token: string
  role?: string
  admin_status?: string
  active_status: string
  created_at: string
  updated_at: string
}
export interface IUserManagementDetails {
  success: boolean
  message: string
  data: IAdminUserDetails
}

export interface IAdminUserDetails {
  id: number
  name: string
  email: string
  phone: string
  device_token: string
  role: string
  admin_status: string
  active_status: string
  created_at: string
  updated_at: string
}
export interface ICreateUserDataForm {name:string,email:string,password:string}