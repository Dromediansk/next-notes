"use client";

import { setFilter, getFilter } from "@/stores/filter";
import { setIsLoadingNotes } from "@/stores/notes";
import { formatDate } from "@/utils/functions";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

const options: IOptions = {
  clearBtn: false,
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  language: "en-UK",
  theme: {
    background: "bg-white",
    todayBtn:
      "bg-main hover:bg-main-dark dark:bg-main dark:hover:bg-main-dark focus:ring-0",
    clearBtn: "",
    icons: "",
    text: "text-gray-500 hover:bg-main-lighter dark:hover:bg-main-lighter",
    disabledText: "",
    input: "shadow-sm rounded bg-gray-200 w-44 text-center",
    inputIcon: "",
    selected: "bg-main hover:bg-main-dark",
  },
  datepickerClassNames: "top-50 left-[10%] sm:left-[45%]",
};

const CustomDatePicker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsDate = searchParams.get("date");

  const [value, setValue] = useState<Date>(
    searchParamsDate ? new Date(searchParamsDate) : new Date()
  );
  const [show, setShow] = useState(false);

  const updateDate = (date: Date) => {
    const formattedDate = formatDate(date);
    setFilter({ ...getFilter(), date: formattedDate });
    router.push("/notes?date=" + formattedDate);
    setIsLoadingNotes(true);
  };

  const handleNextDate = () => {
    const date = dayjs(value).add(1, "days").toDate();
    updateDate(date);
  };

  const handlePreviousDate = () => {
    const date = dayjs(value).subtract(1, "days").toDate();
    updateDate(date);
  };

  useEffect(() => {
    if (!searchParamsDate) {
      return;
    }

    setFilter({ ...getFilter(), date: searchParamsDate });
    setValue(new Date(searchParamsDate));
  }, [searchParamsDate]);

  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={handlePreviousDate}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>

      <DatePicker
        options={options}
        value={value}
        onChange={updateDate}
        show={show}
        setShow={setShow}
        selectedDateState={[value, setValue]}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={handleNextDate}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default CustomDatePicker;
