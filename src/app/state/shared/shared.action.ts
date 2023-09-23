import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction("[shared sate] set loading spinner", props<{ IsLoading: boolean }>())

export const setErrorMessage = createAction("[shared sate] set error message", props<{ message: string | null }>())
export const setSuccessMessage = createAction("[shared sate] set sucess message", props<{ message: string | null }>())

export const setIsMobile = createAction("[shared sate] set mobile", props<{IsMobile: boolean}>())
