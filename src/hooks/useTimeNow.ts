import moment, { Locale } from "moment";
import "moment/locale/ru";

export const useTimeNow = (date: string) => {
  const ru: Locale = moment.localeData("ru");
  moment.locale("ru", [ru]);
  return moment(date).fromNow();
};
