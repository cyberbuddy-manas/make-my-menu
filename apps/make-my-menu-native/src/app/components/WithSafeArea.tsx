import React, { ReactNode, ComponentType } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children?: ReactNode;
  [key: string]: any;
};

const WithSafeArea = (Component: ComponentType<Props>): React.FC<Props> => {
  return (props: Props) => (
    <SafeAreaView style={styles.safeArea}>
      <Component {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default WithSafeArea;
