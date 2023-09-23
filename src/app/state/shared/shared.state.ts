export interface SharedState {
  IsLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  IsMobile: boolean;
}

export const sharedState: SharedState = {
  IsLoading: false,
  errorMessage: null,
  successMessage: null,
  IsMobile: false
}
