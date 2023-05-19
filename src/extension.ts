// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Zowe } from './initialize/zowe';
import { NewTree, createNewTree } from './initialize/view';
import { Commands } from './initialize/commands';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	Zowe.registerProfileType();
	await Commands.initializeTreeView(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
