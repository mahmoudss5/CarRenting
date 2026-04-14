# Real-Time Notifications with WebSocket/SignalR

This guide shows how to implement real-time notifications using SignalR WebSockets in your car rental platform.

## Backend Implementation

### 1. SignalR Package Added
- Added `Microsoft.AspNetCore.SignalR` v10.0.0 to `backEnd.csproj`

### 2. NotificationHub Created
- **Location**: `backEnd/Hubs/NotificationHub.cs`
- **Features**:
  - JWT authentication required
  - Users join personal notification groups
  - Real-time notification broadcasting
  - Connection management

### 3. Program.cs Configuration
- Added SignalR services
- Configured CORS for credentials (required for WebSockets)
- Mapped hub endpoint at `/notificationHub`

### 4. Enhanced NotificationService
- **Real-time broadcasting**: Notifications are sent instantly via WebSocket
- **Live count updates**: Unread notification counts update in real-time
- **Group messaging**: Users receive notifications only for their account

## Frontend Implementation

### 1. SignalR Client Package
- Added `@microsoft/signalr` v8.0.0 to `package.json`

### 2. Notification Service
- **Location**: `frontEnd/src/services/notificationService.js`
- **Features**:
  - JWT token authentication
  - Automatic reconnection
  - Event-driven architecture
  - Connection status monitoring

### 3. React Hook
- **Location**: `frontEnd/src/hooks/useNotifications.js`
- **Features**:
  - Easy integration with React components
  - State management for notifications
  - Automatic cleanup on unmount

### 4. Notification Component
- **Location**: `frontEnd/src/components/NotificationBell.js`
- **Features**:
  - Visual notification bell with badge
  - Dropdown notification list
  - Connection status indicator
  - Mark as read functionality

## How to Use

### Backend Usage
The notification system automatically broadcasts when:
- New rental requests are created
- Rental requests are accepted/rejected
- Car posts are approved/rejected
- License verifications complete
- Reviews are posted

### Frontend Integration

```javascript
import NotificationBell from './components/NotificationBell';

// In your main App component or authenticated area
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      <NotificationBell token={token} />
      {/* Your other components */}
    </div>
  );
}
```

### Manual Notification Creation
```csharp
// In any service that needs to send notifications
await _notificationService.CreateAsync(
    userId: targetUserId,
    type: "NewRentalRequest",
    message: "You have a new rental request!",
    referenceId: rentalId,
    referenceType: "RentalRequest"
);
```

## SignalR Events

### Client Events (Frontend → Backend)
- `MarkAsRead(notificationId)` - Mark specific notification as read

### Server Events (Backend → Frontend)
- `ReceiveNotification(notification)` - New notification received
- `NotificationCount(count)` - Updated unread count

## Connection Management

### Automatic Features
- **Reconnection**: Automatically reconnects on connection loss
- **Authentication**: Uses JWT token for secure connections
- **Group management**: Users automatically join/leave notification groups
- **Cleanup**: Connections are properly cleaned up on logout

### Connection Status
The notification bell shows connection status:
- 🟢 Green: Connected and receiving real-time notifications
- 🔴 Red: Disconnected, falling back to polling/manual refresh

## Security

- **JWT Authentication**: All WebSocket connections require valid JWT tokens
- **User isolation**: Users only receive notifications for their own account
- **CORS protection**: Configured to only allow your frontend domain

## Testing

1. **Install dependencies**:
   ```bash
   cd frontEnd
   npm install
   ```

2. **Start the backend** (SignalR will be available at `ws://localhost:5000/notificationHub`)

3. **Test notifications**:
   - Login as a car owner
   - Have another user (renter) create a rental request
   - The owner should receive instant notification

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure `AllowCredentials()` is set in CORS policy
2. **Authentication failures**: Verify JWT token is valid and not expired
3. **Connection drops**: Check network connectivity and server logs
4. **Notifications not received**: Verify user is in correct notification group

### Debug Mode
SignalR logging is enabled in development. Check browser console for connection details.

## Performance Considerations

- **Connection pooling**: SignalR efficiently manages multiple connections
- **Group broadcasting**: Only sends notifications to relevant users
- **Automatic cleanup**: Stale connections are automatically removed
- **Scalability**: Can be configured with Redis backplane for multiple servers