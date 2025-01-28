import { map } from "nanostores";

export interface User {
  isLoggedIn: boolean;
}

export const $user = map<User>({
  isLoggedIn: false,
});
