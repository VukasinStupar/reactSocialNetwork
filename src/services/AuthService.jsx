import { request } from '../Base/HTTP';
import HttpMethod from '../Base/HttpMethod';

export async function registerUser(data) {
  return await request('/auth/signup', data, HttpMethod.POST);
}

export async function loginUser(data) {
  return await request('/auth/login', data, HttpMethod.POST);
}




  