import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectWS = (userId, onMessageReceived) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
        stompClient?.subscribe(`/topic/${userId}`, (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();
};

export const disconnect = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};

export const sendMessageWS = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/chat.send',
            body: JSON.stringify(message),
        });
    }
};