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
1. Set insomnia to debug mode (the menu in the middle at the top that says: design - debug - test, select 'debug')
2. Click on the 'Environment' (typically 'No Environment') - click 'Manage Environments'
3. Copy paste this json with the values that you received from support:

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
