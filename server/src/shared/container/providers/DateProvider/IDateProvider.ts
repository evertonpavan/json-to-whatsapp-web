interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  convertToUsaUTC(date: Date): string;
  convertStringToUTC(date: string): string;
  convertStringToUsaUTC(date: string): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  compareInSeconds(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
