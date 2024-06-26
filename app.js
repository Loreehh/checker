const {BrowserWindow, app, Menu, menu, shell} = require('electron');
const { request } = require('request');
const createWindow = () => {
    const window = new BrowserWindow({
        width: 1820,
        length: 1800,
        icon: __dirname + '/icon.png',
    });
    const menu = Menu.buildFromTemplate(menuChecker);
    Menu.setApplicationMenu(menu);
    window.loadFile('index.html');
}
app.whenReady(). then(() => {
    createWindow();
})
const menuChecker = [
    {
        label: "Checker",
        submenu: [
            {
                label: "Changelogs",
                accelerator: process.platform === 'darwin' ? "Command+M" :  "Ctrl+M",
                click: () => {
                    shell.openExternal("https://github.com/Loreehh/checker/releases");
                }
            },
            {
                label: "Wiki",
                accelerator: process.platform === 'darwin' ? "Command+?" :  "Ctrl+?",
                click: () => {
                    shell.openExternal("https://github.com/Loreehh/checker");
                }

            },
            {
                label: "Quit",
                accelerator: process.platform === 'darwin' ? "Command+Q" : "Ctrl+W",
                click() {
                    app.quit();
                }
            },
            {
                role: "reload"
            }
        ]
    }
]

if (process.env.NODE_ENV !="production") {
    menuChecker.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Toggle DevTools",
                accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}

