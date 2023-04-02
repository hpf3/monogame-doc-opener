//this file contains functions that are used to debug the extension

//import the vscode module
import * as vscode from 'vscode';

//import the logger module
import * as logger from './logger';

//import the registry module
import * as registry from '../registry';

//this function is used to output the available api from the selected extension
export async function viewAvailableApis() {
    //get the extension
    let csharp = registry.extensions[0];
}

//this function gets the available apis from every enabled extension
export async function viewAvailableApisFromAllExtensions() {
    //get the list of all enabled extensions
    let extensions = registry.extensions;
    //for each extension
    for (let extension of extensions) {
        //if the extension is enabled
        if (extension.isActive) {
            //get the extension name
            let extensionName = extension.packageJSON.name;
            //log the extension name
            logger.logMessage('Extension name: ' + extensionName);
            //get the available api
            let api = extension.exports;
            //if the api is not found, output an error message
            if (api === undefined || api === null) {
                //log the error
                logger.logErrorMessage('API not found');
            }
            //if the api is found, output the available api to the console
            else {
                //get the api names
                let apiNames = Object.keys(api);
                logger.logMessage('  Available APIs:');
                //recursively get the api names
                getApiNames(api, '    ');
            }
        }
    }
}

//this is a helper function to recursively get the api names from an object
export async function getApiNames(apiR: any, indent: string) {
    //get the api names
    let apiNames = Object.keys(apiR);
    //for each api name
    for (let apiName of apiNames) {
        //get the api
        let api = apiR[apiName];
        //log the api name and type
        logger.logMessage(indent + apiName + ': ' + typeof api);
        //if the api is an object, recursively call this function
        if (typeof api === 'object') {
            await getApiNames(api, indent + '  ');
        }
        //if the api is a function and starts with 'get', log the return type
        else if (typeof api === 'function' && apiName.startsWith('get')) {
            //get the return type
            let returnType = api();
            //log the return type
            logger.logMessage(indent + '  Return type: ' + returnType);
            //if the function returns anything call this function
            if (returnType !== undefined && returnType !== null) {
                getApiNames(returnType, indent + '    ');
            }
        }
        //if the return type is a promise, log the return type of the task
        else if (api.then !== undefined) {
            api.then((value: any) => {
                logger.logMessage(indent + '    Return type of task: ' + value);
                //if the return type is an object, recursively call this function
                if (typeof value === 'object') {
                    getApiNames(value, indent + '      ');
                }
            });
            //await the promise
            await api;
        }
        //if the api is an array, call this function for each item in the array
        else if (Array.isArray(api)) {
            for (let item of api) {
                getApiNames(item, indent + '  ');
            }
        }
    }
}


