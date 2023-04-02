//this file contains functions that are used to log messages

//import the vscode module
import * as vscode from 'vscode';

//activate the console
const console = vscode.window.createOutputChannel('MonoGame-Doc-Opener');



//this function is used to log a message to the console
export function logMessage(message: string) {
    console.appendLine("INFO:"+message);
}

//this function is used to log an error message to the console
export function logErrorMessage(message: string) {
    console.appendLine("ERROR:"+message);
}

//this function is used to log a warning message to the console
export function logWarningMessage(message: string) {
    console.appendLine("WARN:"+message);
}

//this function is used to log a custom message type to the console
export function logCustomMessage(message: string, type: string) {
    console.appendLine(type+":"+message);
}