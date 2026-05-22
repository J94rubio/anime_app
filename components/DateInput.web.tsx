import { StyleProp, ViewStyle } from "react-native";

interface Props {
  value: string;
  onChange: (date: string) => void;
  hasError?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

export default function DateInput({ value, onChange, hasError }: Props) {
  return (
    <input
      type="date"
      value={value}
      max={new Date().toISOString().split("T")[0]}
      onChange={(e) => onChange(e.target.value)}
      style={{
        backgroundColor: "#1C1C26",
        border: `1px solid ${hasError ? "#EF4444" : "#2E2E40"}`,
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        color: value ? "#F0EEFF" : "#888",
        width: "100%",
        boxSizing: "border-box",
        colorScheme: "dark",
      }}
    />
  );
}
