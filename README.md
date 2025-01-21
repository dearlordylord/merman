# Intro

Self-hosted Mermaid renderer (frontend-side).

A tiny app that renders mermaid diagram from url query param (the current technique used on mermaid.live) for e.g. use in iframes.

Use if you'd like to self-host / customize, otherwise use https://mermaid.live/

Repo contains of two static sites and some shared code.

## Renderer

Renderer takes gzipped mermaid diagram from url and unpacks/renders it. Minimum dependencies

## Encoder

Encoder is a helper app that lets you encode mermaid diagrams into gzipped url part.

Don't care about size, so, react an all.

### Envs

VITE_BASE_URL to set your Renderer's base url that the Encoder will generate links to

# Dev

`npx nx serve renderer`
`npx nx serve encoder`

# Build

`npx nx build renderer`
`npx nx build encoder`


# Tests

`npx nx run-many --target=test --all`
