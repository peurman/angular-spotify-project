export interface LoginState {
  loggedIn: boolean;
  user: User | null;
}

export interface User {
  display_name: string;
  followers: {
    href: string;
    total: number;
  };
  images: [
    {
      url: string;
    }
  ];
}
