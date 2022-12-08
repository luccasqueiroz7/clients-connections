export interface IClientRequest {
  name: string;
  username: string;
  password: string;
  emails?: string[];
  phones?: string[];
}

export interface IClientLogin {
  username: string;
  password: string;
}

export interface ICLientUpdate {
  name?: string;
  username?: string;
  password?: string;
}
