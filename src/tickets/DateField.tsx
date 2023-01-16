import {
  DateField as RaDateField,
  DateFieldProps,
  useRecordContext,
} from "react-admin";

export const DateField = (props: DateFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;
  const today = new Date();
  return today.toDateString() === new Date(record.updated_at).toDateString() ? (
    <RaDateField
      {...props}
      showTime
      showDate={false}
      options={{ timeStyle: "short", hour12: false }}
    />
  ) : (
    <RaDateField {...props} options={{ day: "numeric", month: "short" }} />
  );
};
