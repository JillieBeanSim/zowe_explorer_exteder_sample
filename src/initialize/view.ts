import * as vscode from 'vscode';
import { createNewTree } from './tree';

export class TreeView {
    public static async initializeTreeView(context: vscode.ExtensionContext) {
        const treeProvider = await createNewTree(context);
        if (treeProvider === null) {
            return null;
        }
        context.subscriptions.push(vscode.commands.registerCommand(
            "ze-extender-new-view.refresh", () => {
              treeProvider.refresh();
            }
        ));
        context.subscriptions.push(
        vscode.commands.registerCommand(
            "ze-extender-new-view.add",
            async () => {
              vscode.window.showInformationMessage('Use Zowe Explorer at this time to create profiles or config files.')
            }
        ));
        return treeProvider;
    }
}