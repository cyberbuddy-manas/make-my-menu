import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useRestaurantHook } from '../api/hooks';
import { useNavigation } from '@react-navigation/native';

const initialValues = { subDomain: '', restaurantName: '', address: '' };
const initialErrors = { subDomain: '', restaurantName: '', address: '' };

let timeoutId: NodeJS.Timeout;

export function debounce(func: Function, delay: number) {
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
export default function OnBoardRestaurantScreen() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const { onBoardRestaurant } = useRestaurantHook();

  const navigation = useNavigation();
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const generateDomainSuggestions = (restaurantName: string) => {
    const splitRestaurantName = restaurantName.split(' ');
    const trimmedRestaurantName = restaurantName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    const domainSuggestions = [
      trimmedRestaurantName,
      trimmedRestaurantName.replace(/\s+/g, ''),
      trimmedRestaurantName.slice(0, 2),
      // Get first element of each word in splitCompanyName
      splitRestaurantName
        .map((word) => word[0])
        .join('')
        .toLowerCase(),
    ];
    // Remove duplicates
    const uniqueDomainSuggestions = [...new Set(domainSuggestions)] as any;
    console.log(uniqueDomainSuggestions);
    setDomainSuggestions(uniqueDomainSuggestions);
  };

  const handleTextChange = useCallback(
    debounce((newText: string) => {
      // Your debounced logic here
      generateDomainSuggestions(newText);
    }, 300),
    []
  );
  const onChangeText = (newText: string) => {
    setValues((val) => {
      return {
        ...val,
        restaurantName: newText,
      };
    });

    handleTextChange(newText);
  };

  const validate = () => {
    let valid = true;
    if (!values.subDomain) {
      valid = false;
      setErrors((err) => {
        return { ...err, subDomain: 'subDomain is required' };
      });
    }
    if (!values.restaurantName) {
      valid = false;
      setErrors((err) => {
        return { ...err, restaurantName: 'restaurantName is required' };
      });
    }
    if (!values.address) {
      valid = false;
      setErrors((err) => {
        return { ...err, address: 'address is required' };
      });
    }

    return valid;
  };
  const handleSubmit = () => {
    if (validate()) {
      onBoardRestaurant(values);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          <TextInput
            key="restaurant name"
            placeholder="Restaurant Name"
            mode="outlined"
            value={values.restaurantName}
            error={!!errors.restaurantName}
            onChangeText={onChangeText}
            onFocus={() => {
              setErrors(initialErrors);
            }}
            autoCapitalize="none"
          />
          {!!errors.restaurantName && (
            <HelperText type="error">{errors.restaurantName}</HelperText>
          )}
        </View>
        <View
          style={{
            marginBottom: 8,
          }}
        >
          <TextInput
            // left={<TextInput.Icon icon="email" />}
            key="subdomain"
            placeholder="Website"
            mode="outlined"
            right={
              <Text
                style={{
                  color: 'black',
                }}
              >
                hi
              </Text>
            }
            value={values.subDomain}
            error={!!errors.subDomain}
            onChangeText={(text) => {
              setValues((val) => {
                return {
                  ...val,
                  subDomain: text,
                };
              });
            }}
            onFocus={() => {
              setErrors(initialErrors);
            }}
            autoCapitalize="none"
          />

          {!!errors.subDomain && (
            <HelperText type="error">{errors.subDomain}</HelperText>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 8,
          }}
        >
          {domainSuggestions.map((suggestion, index) => {
            return (
              <View key={suggestion}>
                {suggestion && (
                  <Button
                    key={suggestion}
                    mode="contained"
                    onPress={() => {
                      setValues((val) => {
                        return {
                          ...val,
                          subDomain: suggestion,
                        };
                      });
                    }}
                  >
                    {suggestion}
                  </Button>
                )}
              </View>
            );
          })}
        </View>

        <View
          style={{
            marginBottom: 16,
          }}
        >
          <TextInput
            key="address"
            placeholder="Address"
            mode="outlined"
            value={values.address}
            error={!!errors.address}
            onChangeText={(text) => {
              setValues((val) => {
                return {
                  ...val,
                  address: text,
                };
              });
            }}
            onFocus={() => {
              setErrors(initialErrors);
            }}
            autoCapitalize="none"
          />
          {!!errors.address && (
            <HelperText type="error">{errors.address}</HelperText>
          )}
        </View>
        <Button
          buttonColor="#DC520C"
          style={{
            marginTop: 16,
            borderRadius: 0,
          }}
          mode="contained"
          onPress={handleSubmit}
        >
          On Board
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
