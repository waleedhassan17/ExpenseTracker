import axios from 'axios';

const BackEnd_URL ='https://expensetracker-app-1e174-default-rtdb.firebaseio.com/';
export async function storeExpense(expenseData) {
    const response = await axios.post(BackEnd_URL + '/expenses.json',expenseData);
    const id = response.data.name;
    return id;
    
}

export async function fetchExpense() {
   const response = await axios.get(BackEnd_URL + '/expenses.json');
   const expenses = [];
   for(const key in response.data)
   {
    const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
    };
    expenses.push(expenseObj);
   }
   return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BackEnd_URL}/expenses/${id}.json`, expenseData);
}

export function deletedExpense(id) {
  return axios.delete(`${BackEnd_URL}/expenses/${id}.json`);
}
