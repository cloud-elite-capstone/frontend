export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  currency: string;
  defaultHub: string;
  avatarUrl: string | null;
}

export const defaultUserProfile: UserProfile = {
  fullName: "John Reniel",
  username: "johnreniel",
  email: "john.reniel@example.com",
  phone: "+63 917 849 2011",
  currency: "PHP (₱)",
  defaultHub: "BGC Taguig Metro Hub",
  avatarUrl: null,
};
