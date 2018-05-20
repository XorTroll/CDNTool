const electron = require("electron");
const consts = require("./Scripts/Constants");

// Program's entry point

let wnd;
electron.app.on('ready', function()
{
    wnd = new electron.BrowserWindow({ minWidth: 800, minHeight: 600, frame: false, title: consts.Name + ": " + consts.Description });
    wnd.loadURL(__dirname + "\\CDNTool.html");
});

electron.app.on('window-all-closed', function()
{
    electron.app.quit();
});