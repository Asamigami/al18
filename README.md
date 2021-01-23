# AzurLaneL2DViewer

Azur Lane © is owned by Shanghai Manjuu, Xiamen Yongshi, Shanghai Yostar | All logos and trademarks are property of their respective owners.
Special thanks to /alg/, English Koumakan Wiki, Chinese Wikis, Japanese Wikis, and to all our contributors. This is a non-profit website.


AzurLaneL2DViewer

Copyright (C) 2021  alg-wiki

Contact at botebreeder@gmail.com

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see http://www.gnu.org/licenses/.


Copied from the previous L2D viewer source at https://github.com/alg-wiki/AzurLaneL2DViewer due to inactivity.


# How to Contribute

Obviously this only needs to be updated when new L2D skins are added to the game.

The packed L2D files on Android can be found in the following two locations:

- Android/obb/com.YoStarEN.AzurLane/main.51006.com.YoStarEN.AzurLane.obb (you can simply extract this like a regular zip file and look for the live2d folder)

- Android/data/com.YoStarEN.AzurLane/files/AssetBundles/live2d

In order to extract L2D content from these files you'll need to use this tool https://github.com/Perfare/UnityLive2DExtractor

Grab the latest release zip, extract it, and then drag and drop the whole live2d folder onto the .exe (or find the newly added L2D inside the folder and only drag that if you don't want to extract everything)

This will create a Live2DOutput folder with all the extracted L2D contents needed.

These are placed directly in the assets/ directory in this repo

Next we also need any new backgrounds which on Android can be found at:

- Android/obb/com.YoStarEN.AzurLane/main.51006.com.YoStarEN.AzurLane.obb (you can simply extract this like a regular zip file and look for the bg folder)

- Android/data/com.YoStarEN.AzurLane/files/AssetBundles/bg

In order to extract these we need to use this tool https://github.com/Perfare/AssetStudio

Grab the latest release zip, extract it, run the .exe and go to file > load folder and select the bg folders

It'll load all the backgrounds, L2D skins won't use most of these but I'm too lazy to sort them so I just extract most of them except the obvious ones that won't fit with different dimensions etc.

Go to Filter Type > Texture2D then select all the Texture2D assets, right click on them and select Export selected assets and choose a place to extract them, it'll create a Texture2D folder there with everything you selected saved as .png

These are placed directly in the assets/bg/ directory in this repo

Any new background files need to be added to js/backgroundData.js - the format should be obvious and simple to follow

Any new L2D skins need to be added to js/charData.js - the format should be obvious again, though note these L2D folders use the Chinese romanised names for the ships which is annoying to get used to, if you look at https://gitgud.io/alg-wiki/wikia/-/blob/master/json/shiplist.json which (should) have a list of every ship and the corresponding Chinese name in the icon filename
