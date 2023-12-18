import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { InputProps } from "@mui/material";
import { DateValidationError } from "@mui/x-date-pickers/models";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export type DatePickerType = {
  control: Control | undefined;
  rules: object;
  label?: string;
  error: any;
  className?: string;
  name: string;
  inputProps: Partial<InputProps>;
  onChange?: any;
  disabled?: boolean;
  defaultValue?: any;
  minDate?: any;
  maxDate?: any;
  format?: string;
  setError?: any;
};

const DatePickerCommon = ({ ...props }: DatePickerType) => {
  const t = useTranslations();
  const [error, setError] = React.useState<DateValidationError | null>(null);
  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return t("common.messages.msg003", {
          field: "Month",
        });
      }
    }
  }, [error]);
  return (
    <DatePicker
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.defaultValue ?? null}
      className={"w-full date-picker " + (props.className ?? "")}
      label={props.label}
      format={props.format || "YYYY-MM-DD"}
      minDate={props.minDate}
      maxDate={props.maxDate}
      onError={(newError) => setError(newError)}
      slots={{
        openPickerIcon: CalendarTodayIcon,
      }}
      views={["month", "year"]}
      slotProps={{
        textField: {
          helperText: errorMessage,
          inputProps: {
            readOnly: true,
            onKeyDown: (e) => e.stopPropagation(),
          },
        },
        popper: {
          placement: "bottom-end",
          sx: {
            top: "4px !important",
            ".MuiPaper-root": {
              borderRadius: "16px !important",
              ".MuiPickersDay-root": {
                "&:hover, &:focus": {
                  backgroundColor: "#E1F6D4 !important",
                },
              },
              ".MuiPickersDay-today": {
                border: "1px solid #0575ad !important",
                "&:hover, &:focus": {
                  backgroundColor: "#F2F9ED !important",
                },
              },
              ".Mui-selected": {
                color: "#FFF !important",
                "&:focus, &:hover": {
                  backgroundColor: "#0575ad !important",
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default DatePickerCommon;
