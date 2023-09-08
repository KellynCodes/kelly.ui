export interface SharedState {
  IsLoading: boolean;
  errorMessage: string | null;
  IsMobile: boolean;
}

export const sharedState: SharedState = {
  IsLoading: false,
  errorMessage: null,
  IsMobile: false
}
