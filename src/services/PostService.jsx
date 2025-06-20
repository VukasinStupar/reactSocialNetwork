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

export async function getUserPostsProfile(userId) {
    return await request(`/api/posts/displayUserPosts/${userId}`, {}, HttpMethod.GET);
}

export async function toggleLike(postId) {
  return await request('/api/likes', { postId }, HttpMethod.POST);
}

export async function fetchPostById(postId) {
  return await request(`/api/posts/${postId}`, {},HttpMethod.GET);
}

export async function addComment(postId, text) {
  return await request(`/api/comments`, { postId, text }, HttpMethod.POST);
}


