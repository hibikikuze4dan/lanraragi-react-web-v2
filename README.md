# Lanraragi React Web v2

Version 2.0 of Lanraragi React Web, a react based front-end application for making use of the [Lanraragi](https://github.com/Difegue/LANraragi) api. Works best on mobile and tablet viewports, but the desktop experience is okay.

## Features

- The app makes use of the Client API to interact with [LANraragi](https://github.com/Difegue/LANraragi) and get access to things like archive, thumbnails, images, categories, etc.

- Read archives (only tested .cbz/.zip files, other supported LRR file formats need testing) from your favorite web browsers on any device.

## Installation

Same as before for the most part. [Check out the old wiki](https://github.com/hibikikuze4dan/lanraragi-react-web/wiki/Installation-and-Startup) but use [this Docker image instead.](https://hub.docker.com/r/persona4dan/lrr-react-v2)

## Demo

[Demo Site](https://lanraragi-react-web-v2.pages.dev/)

NOTE: If your Lanraragi content is being served from an http url, you will need to enable insecure content for the demo site and set the No-Fun Enabled setting to "Yes" in order to see images. This is due to how modern browsers deal with [mixed content issues](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#fixing_mixed_content_issues).

![enable_insecure_content_chrome](/img/enable_insecure_content_chrome.png)

![enable_insecure_content_firefox](/img/enable_insecure_content_firefox.png)

![enable_insecure_content_chrome_mobile](/img/enable_insecure_content_chrome_mobile.jpg)
