export default interface IUser {
  getAllUsers: [
    {
      passportNumber: number;
      name: string;
      password: string;
      active: boolean;
      cash: number;
      credit: number;
      role: "user" | "admin";
    }
  ];
}
