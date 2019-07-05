import io from 'socket.io-client';
const socket = io('http://bountyhuntar.herokuapp.com');

export default socket;

export function joinRoom (locationId) {
  socket.emit('join', `${locationId}`);
};

export function killTarget (locationId, uid) {
  socket.emit('killTarget', `${locationId}`, `${uid}`);
};