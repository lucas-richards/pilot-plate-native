import apiUrl from '../apiConfig'
import axios from 'axios'

// Transaction CRUD

// READ -> Index
export const getUsers = (partialEmail) => {
    return axios(`${apiUrl}/search_users?partialEmail=${partialEmail}`)
}

// Find user friends
export const getFriends = (user) => {
    return axios(`${apiUrl}/user/${user._id}`)
}

// add friend to user

export const addFriend = (user, friendEmail) => {
    console.log(`${apiUrl}/users/${user._id}/add_friend`)
   
    return axios({
        method: 'PUT',
        url: `${apiUrl}/users/${user._id}/add_friend`,
        data: {
            friendEmail: friendEmail,
            user:user 
        },
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

// remove friend from user

export const deleteFriend = (user, friendEmail) => {
    return axios({
        method: 'DELETE',
        url: `${apiUrl}/users/${user._id}/delete_friend/${friendEmail}`,
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}