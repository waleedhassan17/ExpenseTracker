import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/style';

function ExpensesSummary({ expenses, periodName }) {
  // Ensure expenses is an array to avoid runtime errors
  const validExpenses = Array.isArray(expenses) ? expenses : [];

  const expensesSum = validExpenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
