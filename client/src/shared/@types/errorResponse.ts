export interface ErrorResponse {
  error: {
    data: {
      error: {
        statusCode: number
        status: string
      }
      message: string
      stack: string
      status: string
    }
    status: number
    isUnhandledError: boolean
    meta: any
  }
}
