import { useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expense-context';
import { useContext, useState } from 'react';
import { TextInput } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deletedExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
  const[isSubmitting,setIsSubmitting] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  const [error,setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !! editedExpenseId;
  
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
     navigation.setOptions({
    title: isEditing ? 'Edit Expense' : 'Add Expense'
  });
  },[navigation,isEditing]);

 async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try{
       await deletedExpense(editedExpenseId)
         expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    catch(error) {
        setError('Could not delete Right Now!')
        setIsSubmitting(false)
    }
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

 async function confirmHandler(expenseData) {
  setIsSubmitting(true)
  try{
    if (isEditing) {
    expensesCtx.updateExpense(
      editedExpenseId,expenseData
    );
    await updateExpense(editedExpenseId,expenseData);
  } else {
    const id = await storeExpense(expenseData);
    expensesCtx.addExpense({...expenseData, id: id});
  }
   navigation.goBack();
  }
  catch(error)
  {
    setError('Could not save data. Please try again later')
    setIsSubmitting(false)
  }
  
 
}

  function ErrorMessageHandler()
  {
    setError(null);
  }
  if(error && !isSubmitting)
  {
    return <ErrorOverlay message={error} onConfirm={ErrorMessageHandler}/>
  }

  if(isSubmitting){
    return <LoadingOverlay />
  }


  return (
    <View style={styles.container}>
      <ExpenseForm
  onCancel={cancelExpenseHandler}
  onSubmit={confirmHandler}
  submitButtonLabel={isEditing ? 'Update' : 'Add'}
  defaultValues= {selectedExpense}
/>

      
        <View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
        
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: GlobalStyles.colors.primary800,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',

  }, 
 

});
