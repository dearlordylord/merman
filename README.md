# Intro

Self-hosted Mermaid renderer (frontend-side).

A tiny app that renders mermaid diagram from url query param (the current technique used on mermaid.live) for e.g. use in iframes.

Use if you'd like to self-host / customize, otherwise use https://mermaid.live/

Repo contains of two static sites and some shared code.

![screenshot](screenshot.png?raw=true)


## Renderer

Renderer takes gzipped mermaid diagram from url and unpacks/renders it. Minimum dependencies

## Encoder

Encoder is a helper app that lets you encode mermaid diagrams into gzipped url part.

Don't care about size, so, react an all.

### Envs

VITE_BASE_URL to set your Renderer's base url that the Encoder will generate links to

[optional] VITE_ENCODER_URL to set your Encoder's base url that the Renderer will use for better ux

# Dev

`npx nx serve renderer`

`npx nx serve encoder`

# Build

`VITE_BASE_URL="https://merman.dearlordylord.com" npx nx build encoder --prod --skip-nx-cache`

`VITE_ENCODER_URL="https://merman.encoder.dearlordylord.com" npx nx build renderer --prod --skip-nx-cache`

# Tests

`npx nx run-many --target=test --all`
