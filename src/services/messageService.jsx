
import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';



export async function fetchMessagesWithUser(userId) {
    return await request(`/api/messages/messagesWithUser/${userId}`, {}, HttpMethod.GET);
}

export async function saveMessage(messageDto) {
    return await request('/api/messages', messageDto, HttpMethod.POST);
}

export async function fetchGroupChat(groupChatId) {
    return await request(`/api/groupChat/allMessagesForGroup/${groupChatId}`, {}, HttpMethod.GET);
}

export async function fetchChattedUsers() {
    return await request('/api/messages/chatted-users', {}, HttpMethod.GET);
}