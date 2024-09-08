import { useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Portal, Text } from 'react-native-paper';
import MenuList from '../components/MenuList';
import { useRestaurantHook } from '../api/hooks';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

type MenuScreenRouteProp = RouteProp<
  {
    params: {
      menu: MenuItem[];
      restaurantName?: string;
    };
  },
  'params'
>;

export default function MenuScreen() {
  const route = useRoute<MenuScreenRouteProp>();
  const { params } = route;
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const { updateRestaurant } = useRestaurantHook();
  useEffect(() => {
    if (params?.menu) {
      const tempMenus = params?.menu?.map((me) => {
        return me?.id ? me : { ...me, id: new Date() };
      });
      setMenus(params.menu);
    }
  }, [params]);

  const handleUpdate = () => {
    console.log('sadhi');
    setMenus((menuReturn) => {
      updateRestaurant({ ...params, menu: menuReturn });
      return menuReturn;
    });
  };
  const handleZomatoMenu = () => {
    // set menu'
  };
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
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Text>{params?.restaurantName || ''}</Text>
      </View>
      <MenuList menus={menus} setMenus={setMenus} handleUpdate={handleUpdate} />
      <Portal>
        <FAB
          label="Zomato Menu"
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
          }}
          icon="plus"
          onPress={() => {}}
        />
      </Portal>
    </ScrollView>
  );
}
