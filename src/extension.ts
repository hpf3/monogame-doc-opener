// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

//import the debug functions
import * as debug from './functions/debug';

//import the logger functions
import * as logger from './functions/logger';

//import the registry
import * as registry from './registry';

//import misc functions
import * as misc from './functions/misc';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	logger.logMessage('Congratulations, your extension "'+context.extension.id+'" is now active!');

	//activate the registry
	registry.activate(context);

	//command to open the documentation
	let commandMain = vscode.commands.registerCommand('monogame-doc-opener.openDoc', async() => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from MonoGame-Doc-Opener!');

		await misc.getHoverText();
	});

	//test command to output the available api from the specified extension
	let commandDebug = vscode.commands.registerCommand('monogame-doc-opener.viewAvailableApis', async() => {
		await debug.viewAvailableApisFromAllExtensions();
	});

	context.subscriptions.push(commandMain);
	context.subscriptions.push(commandDebug);
}

// This method is called when your extension is deactivated
export function deactivate() {}
