import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchUsers(page, size) {
    return await request('api/users', { page, size }, HttpMethod.GET);
    
}