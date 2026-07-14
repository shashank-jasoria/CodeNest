interface Room {
  name: string;
  description?: string;
  password: string;
  code: string;
  language: string;
  users: Map<string, string>; // socketId -> userName
}

const rooms = new Map<string, Room>();

export const createRoom = (
  name: string,
  password: string,
  language: string,
  description?: string,
) => {
  if (rooms.has(name)) return null;
  rooms.set(name, {
    name,
    description,
    password,
    language,
    code: "", // start with empty code
    users: new Map(),
  });
  return rooms.get(name);
};

export const getRoom = (name: string) => rooms.get(name) || null;

export const addUserToRoom = (
  roomName: string,
  socketId: string,
  userName: string,
) => {
  const room = rooms.get(roomName);
  if (room) room.users.set(socketId, userName);
};

export const removeUserFromRoom = (roomName: string, socketId: string) => {
  const room = rooms.get(roomName);
  if (room) {
    room.users.delete(socketId);
    if (room.users.size === 0) rooms.delete(roomName); // cleanup empty rooms
  }
};

export const getUsersInRoom = (roomName: string) => {
  const room = rooms.get(roomName);
  return room ? Array.from(room.users.values()) : [];
};

export const updateRoomCode = (roomName: string, code: string) => {
  const room = rooms.get(roomName);
  if (room) room.code = code;
};
