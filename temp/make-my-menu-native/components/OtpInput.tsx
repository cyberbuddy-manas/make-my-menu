import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface OtpInputProps {
  length: number;
  onChange: (otp: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>(Array(length).fill(null));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(newOtp);

    if (text.length === 1 && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    setTimeout(() => {
      console.log(index, focusedIndex);
    }, 2000);
  };

  const handleBlur = () => {
    console.log('hi');
    setFocusedIndex(null);
  };
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <PaperTextInput
          onFocus={() => handleFocus(index)}
          // onBlur={handleBlur}
          // selectionColor="#DC520C"
          // outlineColor={focusedIndex == index ? '#DC520C' : undefined}
          key={index}
          mode="outlined"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          style={styles.input}
          ref={(ref) => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginVertical: 20,
  },
  input: {
    // width: 50,
    // height: 50,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OtpInput;
