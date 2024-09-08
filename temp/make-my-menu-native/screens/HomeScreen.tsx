import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import {
  AddMenuItemRoute,
  AddRestaurantRoute,
  MenuRoute,
  onBoardRestaurantRoute,
} from '../util/routes';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuthHook, useRestaurantHook } from '../api/hooks';
import { RefreshControl, ScrollView, View } from 'react-native';

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
      headerRight: () => (
        <Button textColor="#DC520C" onPress={logoutUser}>
          Logout
        </Button>
      ),
    });
  }, [navigation]);

  console.log(restaurants);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
      }}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            getRestaurants();
          }}
        />
      }
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          textColor="#DC520C"
          mode="outlined"
          icon="plus"
          onPress={() => {
            navigation.navigate(AddRestaurantRoute);
          }}
        >
          on board restaurant
        </Button>
      </View>
      <View
        style={{
          marginTop: 16,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{
            marginBottom: 16,
          }}
        >
          Restaurants
        </Text>
        {[...restaurants].map((rest, index) => {
          return (
            <Button
              style={{
                marginBottom: 16,
                width: '100%',
              }}
              textColor="#DC520C"
              mode="outlined"
              key={index}
              onPress={() => {
                navigation.navigate(AddMenuItemRoute, rest);
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
