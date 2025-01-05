export interface Competition {
  id: string;
  code: string;
  date: Date;
  location: string;
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean
}
