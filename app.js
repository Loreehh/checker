const {BrowserWindow, app, Menu, menu} = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
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
                accelerator: process.platform === 'darwin' ? "Command+Q" : "Ctrl+Q",
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