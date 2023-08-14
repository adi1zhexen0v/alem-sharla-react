export interface Message {
  displayName: string;
  isManager: false;
  isSeen: boolean;
  imageURL?: string;
  fileURL?: string;
  messageId: string;
  senderId: string;
  sentDate: number;
  text?: string;
}

export interface Correspondence {
  [messageId: string]: Message;
}

export interface Chat {
  [correspondenceId: string]: Correspondence;
}