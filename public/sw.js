self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const title = data.title || "Yeni Bildirim";
    const options = {
      body: data.body || "Yeni bir bildiriminiz var.",
      icon: data.icon || "/icon.svg",
      badge: "/icon.svg",
      data: data.url || "/"
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});

self.addEventListener("fetch", function(event) {
  // PWA installability requires a fetch handler
});

