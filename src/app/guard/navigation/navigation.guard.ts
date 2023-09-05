import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../../services/utils/jwt.service';

export const navigationGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const { IsSuccessful, user } = jwtService.getUser;
  if (IsSuccessful && user != null) {
    return router.navigateByUrl('/');
  }
  return true;
};
