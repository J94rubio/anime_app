import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface Props {
  value: string;
  onChange: (date: string) => void;
  hasError?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

export default function DateInput({
  value,
  onChange,
  hasError,
  inputStyle,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[inputStyle, hasError && { borderColor: "#EF4444" }]}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? "#F0EEFF" : "#888", fontSize: 15 }}>
          {value || "YYYY-MM-DD"}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShow(false);
            if (event.type === "dismissed" || !selectedDate) return;
            onChange(selectedDate.toISOString().split("T")[0]);
          }}
        />
      )}
    </View>
  );
}
