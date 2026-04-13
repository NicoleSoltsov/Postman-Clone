export interface ApiResponse {
  status: number | 'ERROR'
  statusText: string
  data: unknown
}