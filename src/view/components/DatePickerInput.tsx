import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { PopoverRoot, PopoverTrigger } from "./Popover";
import { PopoverContent } from "@radix-ui/react-popover";
import DatePicker from "./DatePicker";

interface DatePickerInputProps {
    className?: string;
    error?: string;
}

const DatePickerInput = ({ className, error }: DatePickerInputProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <PopoverRoot>
                <PopoverTrigger>
                    <button
                        type="button"
                        className={cn(
                            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
                            error && "!border-red-900",
                            className
                        )}
                    >
                        <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
                            Data
                        </span>
                        <span className="">{formatDate(selectedDate)}</span>
                    </button>

                    {error && (
                        <div className="flex gap-2 items-center mt-2 text-red-900">
                            <CrossCircledIcon />
                            <span className="text-xs">{error}</span>
                        </div>
                    )}
                </PopoverTrigger>

                <PopoverContent>
                    <DatePicker
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </PopoverContent>
            </PopoverRoot>
        </div>
    );
};

export default DatePickerInput;
