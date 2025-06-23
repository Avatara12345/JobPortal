
export function decodeJWT(token: string): { id: number; role: string; iat: number; exp: number } | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch  {
      return null;
    }
  }
