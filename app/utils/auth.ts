// utils/auth.ts
import { decodeJWT } from './jwt';

export function getUserFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = decodeJWT(token);
    if (!decoded) return null;

    return {
      id: decoded.id,
      role: decoded.role
    };
  }
  return null;
}
