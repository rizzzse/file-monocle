import path = require("path");
import { app, BrowserWindow } from "electron/main";

app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 800,
        height: 600,
        show: false,
    });
    win.once("ready-to-show", () => win.show());
    if(process.env.NODE_ENV === "development") {
        win.loadURL(process.env.DEV_SERVER_URL!);
    } else {
        win.loadFile(path.join(__dirname, "index.html"));
    }
};

void app.whenReady().then(() => {
    if(process.env.NODE_ENV === "development") {
        (async () => {
            const {
                default: installExtension,
                REACT_DEVELOPER_TOOLS,
            } = await import("electron-devtools-installer");
            await installExtension(REACT_DEVELOPER_TOOLS, {
                // loadExtensionOptions: { allowFileAccess: true },
            });
        })().catch(console.error);
    }
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    createWindow();
});
