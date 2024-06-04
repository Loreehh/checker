const {BrowserWindow, app, Menu, menu} = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        fullscreen: true,
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
    },
    {
        label: "Themes",
        submenu: [
            {
                label: "Light Theme"
            },
            {
                label: "Dark Theme"
            },
            {
                label: "Midnight Theme"
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