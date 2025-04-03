import HttpMethod from '../Base/HttpMethod';
import { request } from '../Base/HTTP';

export async function fetchApplicationAnalytics() {
    const response = await request('/api/analitics/applicationAnalytics', HttpMethod.GET);
    return response;
}
