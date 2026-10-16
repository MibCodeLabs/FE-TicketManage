import { environment } from '../../environments/environment';

export const constructURL = (path: string): string => {
  return environment.baseUrl.concat(path);
};
