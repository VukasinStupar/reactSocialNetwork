import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchUsersForGroup(groupChatId, page, size) {
    return await request(`/api/users/allUsersGroup/${groupChatId}`, { page, size }, HttpMethod.GET);
}

export async function addUserToGroup(groupChatId, userId) {
    return await request(`/api/groupChat/addUserGroup/${groupChatId}/${userId}`, {}, HttpMethod.PUT);
}


export async function removeUserFromGroup(groupChatId, userId) {
    return await request(`/api/groupChat/removeUserGroup/${groupChatId}/${userId}`, {}, HttpMethod.PUT);
}