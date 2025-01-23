const { BrowserWindow, app, Menu, menu, shell } = require("electron");
const { request } = require("request");
const RPC = require("discord-rpc");
const clientId = "1332076966748098580";

let rpc;
const createWindow = () => {
  const window = new BrowserWindow({
    width: 1920,
    length: 1020,
    icon: __dirname + "/assets/icon.png",
  });
  const menu = Menu.buildFromTemplate(menuChecker);
  Menu.setApplicationMenu(menu);
  window.loadFile("pages/homepage/index.html");
};
app.whenReady().then(() => {
  createWindow();
});
const menuChecker = [
  {
    label: "Checker",
    submenu: [
      {
        label: "Changelogs",
        accelerator: process.platform === "darwin" ? "Command+M" : "Ctrl+M",
        click: () => {
          shell.openExternal("https://github.com/Loreehh/checker/releases");
        },
      },
      {
        label: "Wiki",
        accelerator: process.platform === "darwin" ? "Command+?" : "Ctrl+?",
        click: () => {
          shell.openExternal("https://github.com/Loreehh/checker");
        },
      },
      {
        role: "reload",
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+W",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Support",
    submenu: [
      {
        label: "Donations",
        click: () => {
          shell.openExternal("https://paypal.me/x2loreeh");
        },
      },
    ],
  },
];

if (process.env.NODE_ENV != "production") {
  menuChecker.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  console.log("Discord RPC is ready!");
  rpc.setActivity({
    details: "Checker",
    state: "Checking some cryptocurrencies",
    startTimestamp: Date.now(),
    largeImageKey: "logochecker",
    largeImageText: "https://github.com/x2loreeh/checker",
    smallImageKey: "icon",
    smallImageText: "https://github.com/x2loreeh/checker",
    instance: true,
  });
});

rpc.login({ clientId });
app.on("before-quit", () => {
  rpc.destroy();
});
