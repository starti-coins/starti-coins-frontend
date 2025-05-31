export interface ServerError {
  error: string;
  invalid_fields: InvalidField[];
  message: string;
  status_code: number;
}

export interface InvalidField {
  description: string;
  field_name: string;
}
