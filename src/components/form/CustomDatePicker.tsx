"use client";

import { formatDate } from "@/utils/functions";
import { RouteParams } from "@/utils/types/common";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

const options: IOptions = {
  clearBtn: false,
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  language: "en-UK",
  theme: {
    background: "bg-white",
    todayBtn:
      "bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
    clearBtn: "",
    icons: "",
    text: "text-gray-500",
    disabledText: "",
    input:
      "border-2 border-gray-200 shadow-sm rounded",
    inputIcon: "",
    selected: "bg-emerald-500 hover:bg-emerald-700",
  },
  datepickerClassNames: "top-50 left-[15%] sm:left-[30%]",
};

const CustomDatePicker = () => {
  const router = useRouter();
  const params = useParams<RouteParams>();

  const [value, setValue] = useState(new Date(params.date));
  const [show, setShow] = useState(false);

  const handleChange = (date: Date) => {
    setValue(date);
    router.push(formatDate(date));
  };

  return (
    <div>
      <DatePicker
        options={options}
        value={value}
        onChange={handleChange}
        show={show}
        setShow={setShow}
        selectedDateState={[value, setValue]}
      />
    </div>
  );
};

export default CustomDatePicker;
