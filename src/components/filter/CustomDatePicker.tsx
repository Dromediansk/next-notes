"use client";

import { useNoteStore } from "@/providers/notes.provider";
import { setFilter, getFilter } from "@/stores/filter";
import { formatDate } from "@/utils/functions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Datepicker, DatepickerProps } from "flowbite-react";

const datePickerTheme: DatepickerProps["theme"] = {
  views: {
    days: {
      items: {
        item: {
          selected: "bg-gray-300 hover:bg-gray-400",
        },
      },
    },
  },
  popup: {
    footer: {
      button: {
        today: "text-white bg-main-dark hover:bg-main focus:ring-0",
      },
    },
  },
};

const CustomDatePicker = () => {
  const { setIsLoadingNotes } = useNoteStore((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsDate = searchParams.get("date");

  const [value, setValue] = useState<Date | null>(
    searchParamsDate ? new Date(searchParamsDate) : new Date()
  );

  const updateDate = (date: Date | null) => {
    if (!date) {
      return;
    }
    const formattedDate = formatDate(date);
    setFilter({ ...getFilter(), date: formattedDate });
    router.push("/notes?date=" + formattedDate, { scroll: false });
    setIsLoadingNotes(true);
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
      <Datepicker
        showClearButton={false}
        inline
        value={value}
        onChange={updateDate}
        theme={datePickerTheme}
        weekStart={1}
      />
    </div>
  );
};

export default CustomDatePicker;
