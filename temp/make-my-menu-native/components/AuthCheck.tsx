import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStackRoute, AuthStackRoute } from '../util/routes';
import { useDispatch } from 'react-redux';
import { storeCurrentUser, storeToken } from '../store/globalSlice';
import { StackNavigationProp } from '@react-navigation/stack'; // Import navigation types

// Define the navigation type
type AuthCheckProps = {
  navigation: StackNavigationProp<any>;
};

const AuthCheck: React.FC<AuthCheckProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        console.log(token, user);

        if (!token) {
          // No token, navigate to AuthStackRoute
          navigation.replace(AuthStackRoute);
        } else {
          // Have both token and user
          dispatch(storeToken(token));
          if (user) {
            dispatch(storeCurrentUser(JSON.parse(user)));
          }
          navigation.replace(AppStackRoute);
        }
      } catch (e: any) {
        console.log('Error', e);
        Alert.alert('Error', e?.message);
      }
    };

    checkToken();
  }, [dispatch, navigation]);

  return null;
};

export default AuthCheck;
