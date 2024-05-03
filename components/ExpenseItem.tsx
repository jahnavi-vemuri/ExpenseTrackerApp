import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { Expense } from '../context/ExpenseContext';

interface ExpenseItemProps {
  item: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item, onDelete, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.row}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.amountCategoryContainer}>
                  <Text style={styles.amount}>₹ {item.amount}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                <IconButton
                  icon="pencil"
                  onPress={() => onEdit(item)}
                  iconColor="white"
                />
                <TouchableOpacity onPress={() => onDelete(item.id)}>
                  <IconButton icon="delete" iconColor='white' />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.modalContainer} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{item.title}</Text>
              <Text style={styles.modalText1}>{item.description}</Text>
              <Text style={styles.modalText2}>₹{item.amount}</Text>
              <Text style={styles.modalText3}>{item.category}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: '#102C57',
    paddingVertical: 10,
    paddingHorizontal: 15,
    aspectRatio: 16 / 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 3,
  },
  amountCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 5,
  },
  category: {
    fontSize: 16,
    color: 'yellow',
    borderRadius: 5,
    padding: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  modalContent: {
    backgroundColor: '#AF8260',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#102C57'
  },
  modalText1: {
    fontSize: 16,
    marginBottom: 5,
    color: '#102C57',
    fontWeight: 'bold'
  },
  modalText2: {
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
  modalText3: {
    fontSize: 16,
    marginBottom: 5,
    color: 'yellow',
  },
});

export default ExpenseItem;
