export interface ApiResponse {
  status: number | 'ERROR'
  statusText: string
  data: unknown
}

export const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export type Method = typeof methods[number];