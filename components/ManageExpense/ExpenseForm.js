import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import Input from "./input";
import { GlobalStyles } from "../../constants/style";
import { useState } from 'react';
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { validatePathConfig } from "@react-navigation/native";
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {

   const [inputs,setInputs] = useState({
    amount: { value : defaultValues ? defaultValues.amount.toString() : '' ,
      isValid:  true
    },
    date:{ value : defaultValues ? getFormattedDate(defaultValues.date) : '' ,
      isValid: true
    },
    description:{value: defaultValues ? defaultValues.description : '' ,
      isValid: true
    },
   });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true}
      }
    })  
  
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
       // Alert.alert('Invalid Input','Please Check Your Input Values');
       setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value , isValid: amountIsValid} ,
          date: { value: currInputs.date.value , isValid: dateIsValid},
          description: { value: currInputs.description.value , isValid: descriptionIsValid}
        }
       });

       // Prevent submission if data is InValid
       return;

    }
    onSubmit(expenseData)

  }

  const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid


  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputContainer}>
            <Input
            style = {styles.rowInput}
            label="Amount"
            inValid={!inputs.amount.isValid}
            textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input
            style={styles.rowInput}
          label="Date"
          inValid = {!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
        </View>
        
        <Input
          label="Description"
          inValid = {!inputs.description.isValid }
          textInputConfig={{
            multiline: true,
            autoCapitalize: 'none',
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
          }}
        />

        {formIsValid && <Text style={styles.errorText}>Input Values ! Please Check your Data</Text>}
        <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
      </View>
    </ScrollView>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  form: {
    flex: 1,
    marginTop: 8
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,


  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    textAlign: 'center'
  },
   buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
    },
    });
