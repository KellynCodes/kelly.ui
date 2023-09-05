export interface SharedState {
  IsLoading: boolean;
  errorMessage: string | null;
}

export const sharedState: SharedState = {
  IsLoading: false,
  errorMessage: null
}
