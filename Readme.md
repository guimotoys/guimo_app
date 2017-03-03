[![N|Solid](http://i.imgur.com/PXORtkB.jpg)](https://guimo.toys)
# [Guimo&trade;] App V2

## What is Guimo&trade;?
[Guimo&trade;] is a modular smart toy, created to inspire children to live out-of-this-world experiences! It is a being from another planet, who was on an intergallactic mission when was hit by a meteor and fell on the Earth, losing parts of its pieces, programming and personality. The children's goal is to help [Guimo&trade;] recover its programming and mold its personality, by using our free app on a tablet or compatible smartphone.

[![N|Solid](http://i.imgur.com/hCm5tRC.png)](https://guimo.toys) [![N|Solid](http://i.imgur.com/CwIqAOV.jpg)](https://guimo.toys) 



## What is the [Guimo&trade;] App?    
[Guimo&trade;] App is the application used in cellphones to connect and play with [Guimo&trade;]. With it, you can feed, talk and move the toy. **For now the app is only in the language PT-BR, but feel free to translate it into the language you need**

The app is developed with the **[Ionic Framework V1]**,  with some plugins that will be listed below:

* [Bluetooth-Serial] - This plugin enables serial communication over Bluetooth. It was written for communicating between Android or iOS and an Arduino. 
* [Device] - Get device information.
* [Screen Orientation] - Cordova plugin to set/lock the screen orientation
* [Media] - This plugin provides the ability to record and play back audio files on a device
* [Network Information]: Get information about wireless connectivity
* [VirtualJoystick]: It is small library to emulate a virtual joystick for touchscreen
* [AnimateCss]:  Just-add-water CSS animations

[![N|Solid](http://i.imgur.com/Y0XUina.png)](https://guimo.toys) [![N|Solid](http://i.imgur.com/ZbZa6XS.png)](https://guimo.toys) [![N|Solid](http://i.imgur.com/eEn4NdO.png)](https://guimo.toys)
[![N|Solid](http://i.imgur.com/nul0FvS.png)](https://guimo.toys)


## Instalation

To install and use the app, you need the ionic framework installed in your computer. After install this component, you can clone this repo.

After this, enter in the project folder and run this commands to install all plugins:

```sh
$ cd guimo_app (the repo folder)
$ bower install (to install virtualjoystick)
$ ionic state restore
```
**You will need the Android, IOS or WindowsPhone SDKs, depending on the platform used on your device.**
After this, you can add the platforms that you want to build:

```sh
$ ionic platform add <platform>
$ ionic build <platform>
$ ionic run <platform>
```
**You should test the app in a native device, because some plugins need the device hardware to work (like Bluetooth)**
## License
[![N|Solid](http://farm2.static.flickr.com/1073/5122830971_04bdd362c4.jpg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

[Bluetooth-Serial]: <https://github.com/don/BluetoothSerial>
[Device]: <https://github.com/apache/cordova-plugin-device>
[Screen Orientation]: <https://github.com/apache/cordova-plugin-screen-orientation>
[Media]: <https://github.com/apache/cordova-plugin-media>
[Network Information]: <https://github.com/apache/cordova-plugin-network-information>
[VirtualJoystick]: <https://github.com/jeromeetienne/virtualjoystick.js>
[AnimateCss]: <https://daneden.github.io/animate.css/>
[Guimo&trade;]: <https://guimo.toys>
[Ionic Framework V1]: <http://ionicframework.com/docs/v1/>
