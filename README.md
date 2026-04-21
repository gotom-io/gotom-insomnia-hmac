# About

This plugin is written to specifically help authenticate API requests for goTom.io from insomnia.

If you are not a goTom user, then this plugin won't help you solve your issues with HMAC authentication as it was specifically written to work for goTom.

## Installation
### Plugin Files
1. Open insomnia
2. Application - Preferences - Plugins
3. Search 'insomnia-plugin-gotom-hmac'
4. Press install

### Plugin Configuration
*** this was changed recently. So take this is a rough outline

1. It's assumed you are in 'Personal Workspace' (Top left home icon)
2. Click + Create -> Request Collection
3. Set up endpoints, I believe you can figure this out.
4. Click on "Base Environment"
5. Click on the little Pencil Icon next to "Collection environment"
6. You are in "Manage environments". Focus on the big editor in the middle. Top right it says "Table View"
7. "Table view" is a bit evil. Just disable it - you should see json instead.
8. Copy paste this json with the values that you received from support:

```
{
	"graph_export_gotom_api_user": "<your graph username>",
	"graph_export_gotom_api_secret": "<your api secret>",
	"gotom_api_user": "<your api user>",
	"gotom_api_secret": "<your api secret>"
}
```

### Installation if you are a plugin developer
To manually install the plugin, just copy it into the plugins folder. Something like:

```
/home/yourusername/.config/Insomnia/plugins/
```

or press "reveal plugins folder" in Insomnia - Application - Preferences - Plugins

See as well Plugin Configuration step


## Publish to npm example
1. update version nr
```shell 
npm login
git tag v1.0.5
git push origin v1.0.5
```
copy paste auth token https://www.npmjs.com/settings/lukasgotom/tokens/ or generate there with bypass 2fa
```shell 
npm config set //registry.npmjs.org/:_authToken=npm_<YOURAUTHTOKEN_THAT_BYPASSES2fa_auth>
npm publish --access public
```
