import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { onBoardRestaurantRoute } from '../util/routes';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Button
        onPress={() => {
          navigation.navigate(onBoardRestaurantRoute);
        }}
      >
        on board restaurant
      </Button>
      <Text>need all rest</Text>
    </>
  );
}
