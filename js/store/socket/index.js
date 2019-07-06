import io from 'socket.io-client';
const socket = io('http://bountyhuntar.herokuapp.com');

export default socket;

export function joinRoom(locationId, userId, displacement) {
  socket.emit('join', `${locationId}`, `${userId}`, `${displacement}`);
}
export function killTarget(locationId, userId) {
  socket.emit('killTarget', `${locationId}`, `${userId}`);
}
export function sendPosition(locationId, userId, transform) {
  socket.emit('updateAgent', `${locationId}`, `${userId}`, transform)
}