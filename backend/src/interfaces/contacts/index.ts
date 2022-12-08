export interface IContactRequest {
  name: string;
  emails?: string[];
  phones?: string[];
}

export interface IContactUpdate {
  name: string;
}
