import apiUrl from '../apiConfig'
import axios from 'axios'

// Transaction CRUD

// READ -> Index
export const getTransactions = (page) => {
    return axios(`${apiUrl}/transactions?page=${page}`)
}

// READ -> Show
export const getOneTransaction = (id) => {
    return axios(`${apiUrl}/transactions/${id}`)
}

// CREATE -> Add Transaction
export const createTransaction = (user, newTransaction) => {
    return axios({
        url: `${apiUrl}/transactions`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { transaction: newTransaction,user:user }
    })
}
