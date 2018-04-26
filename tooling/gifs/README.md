# Tooling for GIFs

## How to Resize Animated GIFs w/ Compression

> ImageMagick required: `[brew/apt] install imagemagick`

```sh
gifsicle -i ./input.gif --resize-fit-width 960 > ./output-960px-width.gif
```

## Record your Screen

1. [Kap](https://getkap.co/) - Great Open source GIF recorder (OSX only currently)
1. [Licecap](https://www.cockos.com/licecap/) - Basic util for Windows/OSX
1. [OBS](https://obsproject.com/download) - All platform video recorder (will need to convert videos to GIFs)

## Single Screenshot

1. OSX: Cmd+Ctrl+Shift+4 to draw a region & add to your clipboard.
    * Move selection by pressing *SPACEBAR* WHILE holding down shortcut keys.
1. [Add OSX Shortcut to Linux](https://gist.github.com/justsml/74dc77c6278617e093d6)

