import { Message, MessageType } from '../types';

export const createMessage = (
  type: MessageType,
  content: string
): Message => ({
  id: crypto.randomUUID(),
  type,
  content,
  timestamp: new Date(),
});