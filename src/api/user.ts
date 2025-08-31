import type { PaginationResponse, UserResponse } from "../types/UserResponse"
import request from "../utils/axios"

export const getUser = async (pageSize: number, page: number, inquiry:string, sortField: string, sortOrder:string) => {
  return await request.get<PaginationResponse<UserResponse>>(`/users?pageSize=${pageSize}&page=${page}&inquiry=${inquiry}&sortBy=${sortField}:${sortOrder}`)
}