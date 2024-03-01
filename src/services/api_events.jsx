import { instanceEvent } from "./api";

const fetchAllEvent = () => {
    return instanceEvent.get('/events');
}

const createEvent = (requestBody) => {
    return instanceEvent.post('/event', requestBody);
}

// const showUser = (id) => {
//     return instance.get(`/get_user?user_id=${id}`);
// }

// const updateUser = (id, requestBody) => {
//     return instance.put(`/update_user?user_id=${id}`, requestBody);
// }

// const deleteUser = (id) => {
//     return instance.delete(`/delete_user?user_id=${id}`);
// }

export { fetchAllEvent, createEvent };