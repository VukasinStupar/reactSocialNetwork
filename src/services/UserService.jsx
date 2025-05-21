import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchUsers(page, size) {
    return await request('api/users', { page, size }, HttpMethod.GET);
    
}

export async function searchUsers(search) {
    return await request('api/users/search', { param: search }, HttpMethod.GET);
}

export async function searchGroupUsers(searchTerm) {
    return await request(`/api/users/searchUserInGroup/`, { param: searchTerm }, HttpMethod.GET);
}

export async function fetchLoggedUserGroups() {
  return await request('api/groupChat/getLoggedUserGroups', {}, HttpMethod.GET);
}

export async function getUserProfile(userId) {
    return await request(`/api/users/userProfile/${userId}`, {}, HttpMethod.GET);
}

