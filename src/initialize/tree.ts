import { imperative } from '@zowe/cli';
import { Gui, IZoweTree, IZoweTreeNode, PersistenceSchemaEnum } from '@zowe/zowe-explorer-api';
import * as vscode from 'vscode';
import { Zowe } from './zowe';

export async function createNewTree(context: vscode.ExtensionContext): Promise<NewTree> {
    const tree = new NewTree(context);
    await tree.addSession();
    return tree;
}

export class NewTree implements IZoweTree<NewViewTreeNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<
        NewViewTreeNode | undefined | void
    > = new vscode.EventEmitter<NewViewTreeNode | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<
        NewViewTreeNode | undefined | void
    > = this._onDidChangeTreeData.event;
    private context: vscode.ExtensionContext = {} as any;
    private treeView: vscode.TreeView<vscode.TreeItem | IZoweTreeNode>;

    public constructor(context: vscode.ExtensionContext) {
        this.treeView = Gui.createTreeView("ze-extender-new-view", {
            treeDataProvider: this as any,
            canSelectMany: false,
        });
        this.context = context;
    }
    public mSessionNodes: IZoweTreeNode[] = [];
    public mFavoriteSession!: IZoweTreeNode;
    public mFavorites: IZoweTreeNode[] = [];

    public getTreeItem(element: IZoweTreeNode | vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    public async getChildren(
        element?: NewViewTreeNode | undefined
      ) {
        let children: (IZoweTreeNode | vscode.TreeItem)[] = [];
        if (!element) {
          const loadedProfiles = Zowe.getProfiles();
          if (loadedProfiles && loadedProfiles.length > 0) {
            for (const profile of loadedProfiles) {
              const iconPath = vscode.Uri.joinPath(
                this.context.extensionUri,
                "resources",
                "folder-root-default-closed.svg"
              );
              const item = new NewViewTreeNode(
                profile?.name as string,
                vscode.TreeItemCollapsibleState.Expanded,
                profile,
                iconPath
              );
              children.push(item);
            }
          }
        }
        return children as any;
    }
    public async addSession() {
        const iconPath = vscode.Uri.joinPath(
            this.context.extensionUri,
            "resources",
            "folder-root-default-closed.svg"
          );
        const profiles = Zowe.getProfiles();
        console.log(profiles);
        for (const profile of profiles) {
            const node = new NewViewTreeNode(profile.name as string, vscode.TreeItemCollapsibleState.Collapsed, profile, iconPath);
        }
        this._onDidChangeTreeData.fire();
    }
    public async refresh(): Promise<void> {
        // NOTE: commenting out the refresh will result in duplicate RSE profiles when you try and add a profile to
        // a zowe explorer view. Interestingly, if you leave the refresh in, the duplicate RSE profile only occurs when you save
        // the file by hitting CTL+S??
        const profileCache = Zowe.getProfilesCache();
        await profileCache.refresh(Zowe.getZeApis());
        this._onDidChangeTreeData?.fire();
    }
    public editSession(node: IZoweTreeNode, zoweFileProvider: IZoweTree<IZoweTreeNode>): Promise<void> {
        throw new Error('editSession not implemented.');
    }
    public createZoweSession(zoweFileProvider: IZoweTree<IZoweTreeNode>): Promise<void> {
        throw new Error('createZoweSession not implemented.');
    }
    public createZoweSchema(zoweFileProvider: IZoweTree<IZoweTreeNode>): Promise<void> {
        throw new Error('createZoweSchema not implemented.');
    }
    public checkCurrentProfile(node: IZoweTreeNode) {
        throw new Error('checkCurrentProfile not implemented.');
    }
    public ssoLogin(node: IZoweTreeNode) {
        throw new Error('ssoLogin not implemented.');
    }
    public ssoLogout(node: IZoweTreeNode) {
        throw new Error('ssoLogout not implemented.');
    }
    public addFavorite(favorite: IZoweTreeNode) {
        throw new Error('addFavorite not implemented.');
    }
    public removeFavorite(node: IZoweTreeNode) {
        throw new Error('removeFavorite not implemented.');
    }
    public removeFavProfile(profileName: string, userSelected: boolean) {
        throw new Error('removeFavProfile not implemented.');
    }
    public refreshElement(node: IZoweTreeNode): void {
        throw new Error('refreshElement not implemented.');
    }
    public onDidChangeConfiguration(e: vscode.ConfigurationChangeEvent) {
        throw new Error('onDidChangeConfiguration not implemented.');
    }
    public flipState(element: IZoweTreeNode, isOpen: boolean) {
        throw new Error('flipState not implemented.');
    }
    public rename(node: IZoweTreeNode) {
        throw new Error('rename not implemented.');
    }
    public open(node: IZoweTreeNode, preview: boolean) {
        throw new Error('open not implemented.');
    }
    public copy(node: IZoweTreeNode) {
        throw new Error('copy not implemented.');
    }
    public paste(node: IZoweTreeNode) {
        throw new Error('paste not implemented.');
    }
    public delete(node: IZoweTreeNode) {
        throw new Error('delete not implemented.');
    }
    public setItem(treeView: vscode.TreeView<IZoweTreeNode>, node: IZoweTreeNode) {
        throw new Error('setItem not implemented.');
    }
    public saveSearch(node: IZoweTreeNode) {
        throw new Error('saveSearch not implemented.');
    }
    public saveFile(document: vscode.TextDocument) {
        throw new Error('saveFile not implemented.');
    }
    public refreshPS(node: IZoweTreeNode) {
        throw new Error('refreshPS not implemented.');
    }
    public uploadDialog(node: IZoweTreeNode) {
        throw new Error('uploadDialog not implemented.');
    }
    public filterPrompt(node: IZoweTreeNode) {
        throw new Error('filterPrompt not implemented.');
    }
    public addSearchHistory(element: string) {
        throw new Error('addSearchHistory not implemented.');
    }
    public getSearchHistory() {
        throw new Error('getSearchHistory not implemented.');
    }
    public getTreeType(): PersistenceSchemaEnum {
        throw new Error('getTreeType not implemented.');
    }
    public deleteSession(node: IZoweTreeNode) {
        throw new Error('deleteSession not implemented.');
    }
    public getAllLoadedItems?(): Promise<IZoweTreeNode[]> {
        throw new Error('getAllLoadedItems not implemented.');
    }
    public getTreeView(): vscode.TreeView<IZoweTreeNode> {
        throw new Error('getTreeView not implemented.');
    }
    public findFavoritedNode(node: IZoweTreeNode): IZoweTreeNode {
        throw new Error('findFavoritedNode not implemented.');
    }
    public findNonFavoritedNode(node: IZoweTreeNode): IZoweTreeNode {
        throw new Error('findNonFavoritedNode not implemented.');
    }
    public findEquivalentNode(node: IZoweTreeNode, isFavorite: boolean): IZoweTreeNode {
        throw new Error('findEquivalentNode not implemented.');
    }
    public updateFavorites() {
        throw new Error('updateFavorites not implemented.');
    }
    public renameFavorite(node: IZoweTreeNode, newLabel: string) {
        throw new Error('renameFavorite not implemented.');
    }
    public renameNode(profile: string, beforeDataSetName: string, afterDataSetName: string) {
        throw new Error('renameNode not implemented.');
    }
    public openItemFromPath?(path: string, sessionNode: IZoweTreeNode) {
        throw new Error('openItemFromPath not implemented.');
    }
}

export class NewViewTreeNode extends vscode.TreeItem {
    public profile?: imperative.IProfileLoaded;
    constructor(
      public readonly label: string,
      public readonly collapsibleState: vscode.TreeItemCollapsibleState,
      profile?: imperative.IProfileLoaded,
      iconPath?: vscode.Uri
    ) {
      super(label, collapsibleState);
      this.iconPath = iconPath;
      this.contextValue = "NewViewNode";
      this.profile = profile as imperative.IProfileLoaded;
    }
  }

