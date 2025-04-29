const socketIo = require('socket.io');
const authTokenService = require('./authTokenService');

class SocketService {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.userSockets = new Map(); // userId -> socketId
    this.socketUsers = new Map(); // socketId -> userId

    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);

      // Authenticate user and store the mapping
      socket.on('authenticate', async (data) => {
        try {
          const { token } = data;
          const verified = await authTokenService.verifyTokenForSetPassword(
            token,
          );

          if (!verified) {
            socket.emit('auth_error', { message: 'Authentication failed' });
            return;
          }

          const userId = verified.userId;
          this.userSockets.set(userId.toString(), socket.id);
          this.socketUsers.set(socket.id, userId.toString());

          socket.emit('authenticated', { userId });
          console.log(`User ${userId} authenticated with socket ${socket.id}`);
        } catch (error) {
          console.error('Socket authentication error:', error);
          socket.emit('auth_error', { message: 'Authentication failed' });
        }
      });

      // Handle joining a conversation room
      socket.on('join_conversation', (data) => {
        const { conversationId } = data;
        socket.join(`conversation_${conversationId}`);
        console.log(
          `Socket ${socket.id} joined conversation: ${conversationId}`,
        );
      });

      // Handle leaving a conversation room
      socket.on('leave_conversation', (data) => {
        const { conversationId } = data;
        socket.leave(`conversation_${conversationId}`);
        console.log(`Socket ${socket.id} left conversation: ${conversationId}`);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        const userId = this.socketUsers.get(socket.id);
        if (userId) {
          this.userSockets.delete(userId);
          this.socketUsers.delete(socket.id);
          console.log(`User ${userId} disconnected`);
        }
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  // Method to emit message to a specific conversation
  emitToConversation(conversationId, event, data) {
    this.io.to(`conversation_${conversationId}`).emit(event, data);
  }

  // Method to emit message to a specific user
  emitToUser(userId, event, data) {
    const socketId = this.userSockets.get(userId.toString());
    if (socketId) {
      this.io.to(socketId).emit(event, data);
    }
  }

  // Method to emit message to all connected clients
  emitToAll(event, data) {
    this.io.emit(event, data);
  }
}

module.exports = SocketService;
