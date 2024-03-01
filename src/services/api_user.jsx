import { instance } from "./api";

const fetchAllUser = () => {
    return instance.get('/list_users');
}

const createUser = (requestBody) => {
    return instance.post('/create_user', requestBody);
}

const showUser = (id) => {
    return instance.get(`/get_user?user_id=${id}`);
}

const updateUser = (id, requestBody) => {
    return instance.put(`/update_user?user_id=${id}`, requestBody);
}

const deleteUser = (id) => {
    return instance.delete(`/delete_user?user_id=${id}`);
}

export { fetchAllUser, createUser, deleteUser, updateUser, showUser };