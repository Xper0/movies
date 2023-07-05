export interface UserLogin {
  userLogin?: {
    isAdmin?: boolean;
    fullName?: string;
    email?: string;
    image?: string;
    token?: string;
  } | null;
}

export interface UserRegister {
  userRegister: {
    isAdmin?: boolean;
    fullName?: string;
  } | null;
}
export interface userUpdate {
  userUpdateProfile: {} | null;
}
