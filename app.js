const {BrowserWindow, app, Menu} = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
    });

    window.loadFile('index.html');

}

app.whenReady(). then(() => {
    createWindow();
})


const mainMenu = [
    {
        label: "Checker",
        submenu: [
            {
                label: "Quit",
                click() {
                    app.quit();
                }
            }
        ]
    }
]