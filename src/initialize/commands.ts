import * as vscode from 'vscode';
import { NewTree, NewViewTreeNode, createNewTree } from './view';
import { IZoweTree } from '@zowe/zowe-explorer-api';

export class Commands {
    public static async initializeTreeView(context: vscode.ExtensionContext) {
        const treeProvider = await createNewTree(context);
        if (treeProvider === null) {
            return null;
        }
        context.subscriptions.push(vscode.commands.registerCommand(
            "zowe-explorer-extender-newview.refresh", () => {
              treeProvider.refresh();
            }
        ));
        context.subscriptions.push(
        vscode.commands.registerCommand(
            "zowe-explorer-extender-newview.add",
            async () => {
              vscode.window.showInformationMessage('Use Zowe Explorer at this time to create profiles or config files.')
            }
        ));
        return treeProvider;
    }
}