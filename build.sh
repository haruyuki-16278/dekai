#!/bin/sh

zip -r dekai.extension.zip .\
  -x dekai.extension.zip \
    .git/**\* \
    .vscode/**\* \
    **/test/**\* \
    .git* \
    build.sh \
    assets/icon.svg \
    assets/Screenshot.png \
    assets/Screenshot.xcf \
