//misc functions used by the extension
//load the vscode module
import * as vscode from 'vscode';
//load the logger module
import * as logger from './logger';

//wrapper function for the extensions.getExtension function
export function getExtension(extensionName: string) {
    //get the extension
    let extension = vscode.extensions.getExtension(extensionName);
    //if the extension is not found, output an error message
    if (extension === undefined) {
        vscode.window.showErrorMessage('Extension not found: ' + extensionName);
        //log the error
        logger.logErrorMessage('Extension not found: ' + extensionName);
    }
    //if the extension is found, return the extension
    else {
        return extension;
    }
}

//get list of extensions that are set as dependencies by the extension
export function getDependencies(context: vscode.ExtensionContext) {
    //get the extension
    let extension = context.extension;
    //if the extension is not found, return an empty array
    if (extension === undefined) {
        return [];
    }
    //if the extension is found, return the list of dependencies
    else {
        return extension.packageJSON.extensionDependencies;
    }
}

//get all usings from the current document before the namespace declaration given text from a c# file
export function getUsings(text: string) {
    //get the list of usings
    let usings = text.match(/using\s+[\w\.]+;/g);
    //if the list of usings is not found, return an empty array
    if (usings === null) {
        return [];
    }
    //if the list of usings is found, begin the next step
    else {
        //remove any usings that are not before the namespace declaration
        let usingsBeforeNamespace = [];
        //for each using
        for (let using of usings) {
            //if the using is before the namespace declaration
            if (text.indexOf(using) < text.indexOf('namespace')) {
                //add the using to the list
                usingsBeforeNamespace.push(using);
            }
        }
        //remove any usings that are not from the Microsoft.Xna.Framework namespace
        let usingsFromXna = [];
        //for each using
        for (let using of usingsBeforeNamespace) {
            //if the using is from the Microsoft.Xna.Framework namespace
            if (using.indexOf('Microsoft.Xna.Framework') !== -1) {
                //add the using to the list
                usingsFromXna.push(using);
            }
        }
        //clean up the usings
        let cleanedUsings = [];
        //for each using
        for (let using of usingsFromXna) {
            //remove the 'using' and ';' from the using
            let cleanedUsing = using.replace('using', '').replace(';', '');
            //trim the using
            cleanedUsing = cleanedUsing.trim();
            //add the using to the list
            cleanedUsings.push(cleanedUsing);
        }
        //return the list of usings
        return cleanedUsings;
    }

    
}

//get the right click position in the document and return it
export function getRightClickPosition() {
    //get the editor
    let editor = vscode.window.activeTextEditor;
    //if the editor is not found, return null
    if (editor === undefined) {
        return null;
    }
    //if the editor is found, continue
    else {
        //get the position of the right click
        let position = editor.selection.active;
        //return the position
        return position;
    }
}