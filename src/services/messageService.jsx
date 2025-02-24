import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchUsersForUser() {
    return await request('/api/messages/getAllUsersForUser', HttpMethod.GET);
}