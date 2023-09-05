import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction("[shared sate] set loading spinner", props<{ IsLoading: boolean }>())

export const setErrorMessage = createAction("[shared sate] set error message", props<{message: string | null}>())
