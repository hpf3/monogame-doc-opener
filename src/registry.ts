//a basic file for loading globaly used data

//import the vscode module
import * as vscode from 'vscode';

//import the logger module
import * as logger from './functions/logger';

//import the misc module
import * as misc from './functions/misc';

//a global variable to store extension refrences
export let extensions: vscode.Extension<any>[] = [];


//run functions when the extension is activated
export function activate(context: vscode.ExtensionContext) {
    //log the activation of the extension
    logger.logMessage('Registry activated');

    //load dependencies
    loadDependencies(context);

}

//funtion to load dependencies
export function loadDependencies(context: vscode.ExtensionContext) {
    //load the dependencies
    let dependencies = misc.getDependencies(context);
    //for each dependency in the list load the extension then store it in the extensions array
    for (let dependency of dependencies) {
        //log the dependency
        logger.logMessage('Loading dependency: ' + dependency);
        //get the extension
        let extension = misc.getExtension(dependency);
        //if the extension is not found, output an error message
        if (extension === undefined) {
            vscode.window.showErrorMessage('Extension not found: ' + dependency);
            //log the error
            logger.logErrorMessage('Extension not found: ' + dependency);
        }
        //if the extension is found, store it in the extensions array
        else {
            extensions.push(extension);
        }
    }
}
