import { useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import MenuList from '../components/MenuList';

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

  useEffect(() => {
    if (params?.menu) {
      setMenus(params.menu);
    }
  }, [params]);

  const handleUpdate = () => {
    // Handle menu updates here
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
        <MenuList menus={menus} setMenus={setMenus} />
      </View>
    </ScrollView>
  );
}
