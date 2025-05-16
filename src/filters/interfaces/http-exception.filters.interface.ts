export interface PgErrorMappingResponse {
  status: number;
  message?: string;
  error: string;
}

interface IDriverError {
  length: number;
  severity: string;
  code: string;
  detail: string;
  hint: string;
  position: unknown;
  internalPosition: unknown;
  internalQuery: unknown;
  where: unknown;
  schema: string;
  table: string;
  column: unknown;
  dataType: unknown;
  constraint: unknown;
  file: unknown;
  line: number;
  routine: string;
}

export interface IPostgreSQLException extends IDriverError {
  driverError: IDriverError;
}
