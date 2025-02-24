import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchPosts(page, size) {
  return await request('/api/posts', { page, size }, HttpMethod.GET);
}

export async function createPost(data) {
  return await request('/api/posts', data, HttpMethod.POST);
}

export async function updatePost(id, data) {
  return await request(`/api/posts/${id}`, data, HttpMethod.PUT);
}

export async function deletePost(id) {
  return await request(`/api/posts/${id}`, {}, HttpMethod.DELETE);
}