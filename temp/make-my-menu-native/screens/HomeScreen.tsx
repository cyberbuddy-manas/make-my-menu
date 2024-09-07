import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { MenuRoute, onBoardRestaurantRoute } from '../util/routes';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuthHook, useRestaurantHook } from '../api/hooks';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const {
    restaurants,
  }: {
    restaurants: {
      _id: string;
      restaurantName: string;
      menu: object;
    }[];
  } = useSelector((state: RootState) => state.global);
  const { getRestaurants } = useRestaurantHook();
  const { logoutUser } = useAuthHook();
  const navigation = useNavigation();
  useEffect(() => {
    if (restaurants?.length == 0) {
      getRestaurants();
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={logoutUser}>Logout</Button>,
    });
  }, [navigation]);

  console.log(restaurants);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          mode="outlined"
          icon="plus"
          onPress={() => {
            navigation.navigate(onBoardRestaurantRoute);
          }}
        >
          on board restaurant
        </Button>
      </View>
      <View
        style={{
          marginTop: 16,
        }}
      >
        {[...restaurants].map((rest, index) => {
          return (
            <Button
              key={index}
              mode="contained-tonal"
              onPress={() => {
                navigation.navigate(MenuRoute, rest);
              }}
            >
              {rest?.restaurantName}
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
}
