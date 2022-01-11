import { Input, Button, List } from 'antd';
import { useCurrentUser } from 'Hooks';
import React, { useEffect, useState } from 'react';
import { socketService } from 'Services/socket';
type ChatMessage = {
  username: string;
  message: string;
};
const renderMessage = (item: ChatMessage, index: number) => (
  <List.Item key={index}>
    <List.Item.Meta title={item.username} description={item.message} />
  </List.Item>
);

export const Chat = () => {
  const [sendMessage, setSendMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const user = useCurrentUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(e.target.value);
  };
  console.log(messageList);
  const handleSendMessage = () => {
    socketService.sendMessage(user.username, sendMessage);
    setSendMessage('');
  };
  const handleNewMessage = (username: string, message: string) => {
    const newMessage = { username: username, message: message };
    setMessageList((prevList) => [...prevList, newMessage]);
  };
  const handleNotifyMessage = (message: string) => {
    const notifyMessage = { username: '', message: message };
    setMessageList((prevList) => [...prevList, notifyMessage]);
  };
  useEffect(() => {
    socketService.connect();
    socketService.join(user.username);
    socketService.onNewMessage(handleNewMessage);
    socketService.onNotifyMessage(handleNotifyMessage);

    return () => {
      socketService.close();
    };
  }, [user]);

  return (
    <div>
      Chat
      <Input value={sendMessage} onChange={handleChange} />
      <Button type="primary" onClick={handleSendMessage}>
        Send
      </Button>
      <List dataSource={messageList} renderItem={renderMessage} />
    </div>
  );
};
