import { AccountType } from "../enum/account-type.enum";


export interface UserInfo{
    fullName: string;
    accountType: AccountType ;
    profilePicture: string;
}

export interface LoginResponse {
  message: string;
  user: UserInfo;
}
