# Guimo App V2

Guimo App is the application used in cellphones to connect and play with guimo. With it, you can feed, talk and move the toy.

The app is developed with the **ionic framework v1** with some plugins that will be listed below:

* [Bluetooth-Serial] - This plugin enables serial communication over Bluetooth. It was written for communicating between Android or iOS and an Arduino. 
* [Device] - Get device information.
* [Screen Orientation] - Cordova plugin to set/lock the screen orientation
* [Media] - This plugin provides the ability to record and play back audio files on a device
* [Network Information]: Get information about wireless connectivity

# Instalation

To install and use the app, you need the ionic framework installed in your computer. After install this component, you can clone this repo.

After this, enter in the project folder and run this commands to install all plugins:

```sh
$ cd guimo_app (the repo folder)
$ ionic state restore
```

After this, you can add the platforms that you want to build:

```sh
$ ionic platform add <platform>
$ ionic build <platform>
$ ionic run <platform>
```

# License
[![N|Solid](https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.eu.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**You are free to**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material
The licensor cannot revoke these freedoms as long as you follow the license terms.

**Under the following terms**

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.
- **No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

[Bluetooth-Serial]: <https://github.com/don/BluetoothSerial>
[Device]: <https://github.com/apache/cordova-plugin-device>
[Screen Orientation]: <https://github.com/apache/cordova-plugin-screen-orientation>
[Media]: <https://github.com/apache/cordova-plugin-media>
[Network Information]: <https://github.com/apache/cordova-plugin-network-information>
