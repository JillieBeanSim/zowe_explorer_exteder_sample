import * as vscode from 'vscode';
import { getImperativeConfig } from "@zowe/cli";
import { ZoweVsCodeExtension } from "@zowe/zowe-explorer-api";
import { NewTree } from './view';

export class Zowe {
    public static async registerProfileType(): Promise<void> {
        const zeApi = this.getZeApis();
        const sshMeta = getImperativeConfig().profiles!.filter(profileConfig => {
            return profileConfig.type === 'ssh';
        });
        await zeApi.getExplorerExtenderApi().initForZowe('ssh', sshMeta);
        const profileCache = zeApi
        .getExplorerExtenderApi()
        .getProfilesCache();
        profileCache.registerCustomProfilesType('ssh');

        await zeApi.getExplorerExtenderApi().reloadProfiles();
        vscode.window.showInformationMessage(
                'Zowe Explorer Extender New View was registered with Zowe Explorer successfully.'
        );
    }

    public static getProfiles() {
        const profilesCache = this.getProfilesCache();
        return profilesCache.getProfiles('ssh');
    }

    public static getProfilesCache() {
        return this.getZeApis()
        .getExplorerExtenderApi()
        .getProfilesCache();
    }

    public static getZeApis() {
        return ZoweVsCodeExtension.getZoweExplorerApi(
            '2.0.0-SNAPSHOT'
        );
    }
}
