export interface ApiResponse {
  status: number | 'ERROR'
  statusText: string
  data: unknown
}

export const HTTPMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export type HTTPMethod = typeof HTTPMethods[number];