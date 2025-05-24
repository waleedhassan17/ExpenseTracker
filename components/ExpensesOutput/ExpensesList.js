import { FlatList, View, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({ item }) {
  return <ExpenseItem {...item} />;
}

function ExpensesList({ expenses }) {
  // Log outside JSX
  console.log("Expenses received:", expenses);

  // Show fallback text if list is empty or invalid
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.emptyText}>No expenses found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});
