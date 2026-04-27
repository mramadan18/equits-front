import { AxiosError } from "axios";
import { ApiResponse } from "./api";

export type ApiError = AxiosError<ApiResponse<null>>;
