import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../../services/utils/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const { IsSuccessful, user } = jwtService.getUser;
  if (IsSuccessful && user != null) {
    return true;
  }
  return router.navigateByUrl('/auth/login');
};
