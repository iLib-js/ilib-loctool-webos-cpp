# ilib-loctool-webos-cpp
ilib-webos-loctool-cpp is a plugin for the loctool allows it to read and localize cpp files. This plugins is optimized for webOS platform.

## Release Notes
v1.6.0
* Fixed an issue where didn't handle single quotes properly.
* Supported pseudo localization.
* Updated not to load common data repeatedly if it's loaded from another plugin in a project.

v1.5.2
* Updated dependencies.

v1.5.1
* Updated dependencies.

v1.5.0
* Updated dependencies. (loctool: 2.20.2)
* Fixed an issue where common's locale inheritance data values were not checked.
* Updated to check common data's as well when getting base translation.

v1.4.0
* Updated to custom locale inheritance feature work properly in generate mode.
* Added guard code to prevent errors when the common data path is incorrect.
* Updated to generate resources by comparing base translation data even in generate mode.
* Fixed an issue where localeinherit related data was not created properly according to the order of locales.
* Fixed an issue where data is duplicated when it is the same as base translation in generate mode.

v1.3.0
* Updated dependencies. (loctool: 2.20.0)
* Added ability to define custom locale inheritance.
  * i.e) en-AU inherits translations from en-GB
    ~~~~
       "settings": {
            "localeInherit": {
                "en-AU": "en-GB"
            }
        }
    ~~~~
* Added ability to use common locale data.
  * App's xliff data has a higher priority, if there's no matched string there, then loctool checks data in the commonXliff directory.
    ~~~~
       "settings": {
            "webos": {
                "commonXliff": "./common"
            }
        }
    ~~~~

v1.2.0
* Updated dependencies. (loctool: 2.18.0)
* Updated to support loctool's generate mode.
* Added ability to override language default locale.
    ~~~~
       "settings": {
            "localeMap": {
                "es-CO": "es"
            }
        }
    ~~~~

v1.1.7
* Updated dependencies. (loctool: 2.17.0)
* Fixed an issue where strings are not extracted due to incorrect deletion of commented lines.
* Updated to check language default locale translation not to generate duplicate resources.

v1.1.6
* Updated dependencies.(loctool: 2.16.3)
* Used the logger provided by the loctool instead of using log4js directly.
* Added node 16 version testing for circleCI (minimum version of node is v10.0.0)

v1.1.5
* Updated dependent module version to have the latest one. (loctool: 2.16.2)

v1.1.4
* Updated dependent module version to have the latest one. (loctool: 2.14.1)

v1.1.3
* Updated dependent module version to have the latest one. (loctool: 2.13.0)

v1.1.2
* Updated dependent module version to have the latest one. (loctool: 2.12.0)

v1.1.1
* Updated dependent module version to have the latest one. (loctool: 2.10.3)

v1.1.0
* Removed commented lines before parsing so that strings in the comments will not be extracted.
* Updated dependent module version to have the latest one.

v1.0.1
* Updated code to print log with log4js.

v1.0.0
* Implemented to parse properly regarding resource bundle usage of Cpp files.

## License

Copyright (c) 2020-2023, JEDLSoft

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.
