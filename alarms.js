// // background.js

// // Keep track of connected ports
// const connectedPorts = new Set();

// // Listen for incoming connections
// chrome.runtime.onConnect.addListener((port) => {
//   // Add the port to our set of connected ports
//   connectedPorts.add(port);

//   // Listen for messages from the port
//   port.onMessage.addListener((message) => {
//     console.log(`Received message from port ${port.sender.tab.id}:`, message);

//     // Schedule a notification
//     chrome.alarms.create('notification', { when: Date.now() + 5000 });
//   });

//   // When the port is disconnected, remove it from the set of connected ports
//   port.onDisconnect.addListener(() => {
//     connectedPorts.delete(port);
//   });
// });

// // Handle the alarm when it fires
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'notification') {
//     // Send a message to all connected ports
//     connectedPorts.forEach((port) => {
//       port.postMessage({ notification: 'Reminder: Time to take a break!' });
//     });
//   }
// });

// Keep track of connected ports
// const connectedPorts = new Set();

// // Listen for incoming connections
// chrome.runtime.onConnect.addListener((port) => {
//   // Add the port to our set of connected ports
//   connectedPorts.add(port);

//   // Listen for messages from the port
//   port.onMessage.addListener((message) => {
//     console.log(`Received message from port ${port.sender.tab.id}:`, message);

//     // Check if the message is a request to schedule a notification
//     if (message.type === 'scheduleNotification') {
//       // Schedule a notification
//       chrome.alarms.create('notification', { when: Date.now() + 5000 });
//     }
//   });

//   // When the port is disconnected, remove it from the set of connected ports
//   port.onDisconnect.addListener(() => {
//     connectedPorts.delete(port);
//   });
// });

// // Handle the alarm when it fires
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'notification') {
//     // Send a message to all connected ports
//     connectedPorts.forEach((port) => {
//       port.postMessage({ notification: 'Reminder: Time to take a break!' });
//     });
//   }
// });
// background.js

let notificationId = avc;

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.scheduleNotification) {
    // Create a new notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'logo2.png',
      title: 'Reminder',
      message: 'Time to take a break!',
      requireInteraction: true,
    }, (id) => {
      // Store the notification ID so we can clear it later
      notificationId = id;
    });
  }
});

// Listen for the user's response to the notification
chrome.notifications.onClicked.addListener((id) => {
  if (id === notificationId) {
    // Clear the notification and open a new tab
    chrome.notifications.clear(notificationId);
    chrome.tabs.create({ url: 'https://www.google.com/' });
  }
});

// Listen for the user to close the notification
chrome.notifications.onClosed.addListener((id) => {
  if (id === notificationId) {
    // Clear the notification
    chrome.notifications.clear(notificationId);
  }
});
