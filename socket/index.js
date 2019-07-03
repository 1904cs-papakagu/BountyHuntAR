import io from 'socket.io-client';
const PORT = process.env.PORT || 1337;
const socket = io(`http://bountyhuntar.herokuapp.com:${PORT}`);
socket.connect();
export default socket;

export function joinRoom (locationId) {
  socket.emit('join', `${locationId}`);
};

export function killTarget (locationId) {
  socket.emit('killTarget', `${locationId}`);
};