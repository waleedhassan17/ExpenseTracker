import { ScrollView, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expense-context';

function AllExpenses() {
  const ExpensesCtx = useContext(ExpensesContext);
  console.log(ExpensesCtx.expenses)
  const AllExpenses = ExpensesCtx.expenses;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpensesOutput expenses={AllExpenses} expensesPeriod={"Total Expenses"} fallbacktext={"No registered Expense found!"} />
    </ScrollView>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,           // allows the content to grow and enables scrolling if needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,           // optional padding inside scrollview
  },
});
