# game-of-life

Conway's game of life implemented with rust and wasm

## How to build

To build the project you need to have `wasm-pack` in your machine and then run this command in terminal

```sh
wasm-pack build
```

You also need to install some node packages so inside the web folder run this command

```sh
npm install
```

To finally build the project run the following command in the web folder

```sh
npm run build
```

## Running on dev server

Considering you made your wasm package and installing the node modules, run the following command in the web folder

```sh
npm run serve
```
