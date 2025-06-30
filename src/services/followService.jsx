import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchFallow(userId, page, size) {
    return await request('/api/follows/folowee', { userId, page, size }, HttpMethod.GET);
}

export async function fetchFallowers(userId, page, size) {
    return await request('/api/follows/folowers', { userId, page, size }, HttpMethod.GET);
}

export async function followUser(userId) {
  return await request(`/api/follows/${userId}`, {}, HttpMethod.POST);
}

export async function unfollowUser(userId) {
  return await request(`/api/follows/removeFollow/${userId}`, {}, HttpMethod.PUT);
}

export async function checkIfFollowing(followeeId) {
  return await request(`/api/follows/isFollowing/${followeeId}`, {}, HttpMethod.GET);
}