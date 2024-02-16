import dayjs from "dayjs";

export const formatDate = (date: Date, format = "YYYY-MM-DD") => {
  return dayjs(date).format(format);
};
