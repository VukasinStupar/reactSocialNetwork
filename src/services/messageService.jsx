
import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchUsersForUser() {
    return await request('/api/messages/getAllUsersForUser', HttpMethod.GET);
}

export async function fetchMessagesWithUser(userId) {
    return await request(`/api/messages/messagesWithUser/${userId}`, {}, HttpMethod.GET);
}



export async function fetchMessageCreate(messageDto) {
    return await request('/api/messages', messageDto, HttpMethod.POST);
}




