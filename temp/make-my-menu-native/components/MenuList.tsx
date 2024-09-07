import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, Text } from 'react-native';
import { List, IconButton, Button } from 'react-native-paper';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface MenuListProps {
  menus: MenuItem[] | undefined;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuList: React.FC<MenuListProps> = ({ menus = [], setMenus }) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false); // To distinguish between edit and add

  const openEditModal = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const openAddModal = () => {
    setSelectedMenu({ id: Date.now(), name: '', price: 0, description: '' });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const saveMenu = () => {
    if (selectedMenu) {
      if (isEditing) {
        // Update existing menu
        setMenus((prevMenus) =>
          prevMenus.map((menu) =>
            menu.id === selectedMenu.id ? selectedMenu : menu
          )
        );
      } else {
        // Add new menu
        setMenus((prevMenus) => [...(prevMenus ?? []), selectedMenu]);
      }
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {menus && menus.length > 0 ? (
        menus.map((menu) => (
          <List.Item
            key={menu.id}
            title={menu.name}
            description={`${menu.description} - $${menu.price}`}
            right={() => (
              <IconButton icon="pencil" onPress={() => openEditModal(menu)} />
            )}
          />
        ))
      ) : (
        <Text style={styles.noItemsText}>No menu items available.</Text>
      )}

      {/* Add Menu Button */}
      <Button mode="contained" onPress={openAddModal} style={styles.addButton}>
        Add Menu
      </Button>

      {/* Edit/Add Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          {selectedMenu && (
            <>
              <TextInput
                style={styles.input}
                value={selectedMenu.name}
                onChangeText={(text) =>
                  setSelectedMenu({ ...selectedMenu, name: text })
                }
                placeholder="Menu Name"
              />
              <TextInput
                style={styles.input}
                value={String(selectedMenu.price)}
                onChangeText={(text) =>
                  setSelectedMenu({
                    ...selectedMenu,
                    price: parseFloat(text) || 0,
                  })
                }
                placeholder="Price"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={selectedMenu.description}
                onChangeText={(text) =>
                  setSelectedMenu({
                    ...selectedMenu,
                    description: text,
                  })
                }
                placeholder="Description"
              />
              <Button mode="contained" onPress={saveMenu}>
                {isEditing ? 'Save Changes' : 'Add Menu'}
              </Button>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noItemsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  addButton: {
    marginTop: 20,
  },
});

export default MenuList;
