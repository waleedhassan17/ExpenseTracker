import { ScrollView, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpense } from '../util/http';
import { GlobalStyles } from '../constants/style';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
function RecentExpenses() {
  const[isFetching, setIsFetching]=useState(true);
  const[error,setError] = useState();
 
  const expensesCtx = useContext(ExpensesContext);

 

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try{
        const expenses = await fetchExpense();
         expensesCtx.setExpenses(expenses);
      }
      catch(error)
      {  
        setError('Could not fetch Expenses!')
    
      }
        setIsFetching(false);
     
    }
    getExpenses();
  },[])

  function ErrorHandler() {
    setError(null);
  }
  
  if(error && !isFetching)
  {
    return <ErrorOverlay message={error} onConfirm={ErrorHandler}/>
  }
  
  if(isFetching)
  {
    return <LoadingOverlay />
  }

  const RecentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today,7);
    return (expenses.date >date7DaysAgo) && (expenses.date <= today);
  });

  console.log("Context Expenses:", expensesCtx.expenses);
console.log("Recent Expenses:", RecentExpenses);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpensesOutput expenses={RecentExpenses} expensesPeriod={"Last 7 Days"} fallbacktext={"No Expenses registered from the last 7 Days"} />
    </ScrollView>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,           // allows content to grow and enable scrolling if needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,           // optional padding inside scroll view
  },

});
