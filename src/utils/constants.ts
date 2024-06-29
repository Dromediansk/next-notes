import dayjs from "dayjs";

// ROUTES
export const NOTE_BY_CURRENT_DATE_ROUTE = `notes?date=${dayjs().format(
  "YYYY-MM-DD"
)}`;
export const LOGIN_ROUTE = "/login";
