import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_KEY = 'authorize';

export interface AuthorizeMetadata {
  resource: string;
  action: string;
}

export const Authorize = (resource: string, action: string) => 
  SetMetadata(AUTHORIZE_KEY, { resource, action });
