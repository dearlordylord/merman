# Intro

Two static sites

## Renderer

Renderer takes gzipped mermaid diagram from url and unpacks/renders it. Minimum dependencies

## Encoder

Encoder is a helper app that lets you encode mermaid diagrams into gzipped url part.

Don't care about size, so, react an all.

# Dev

`npx nx serve renderer`
`npx nx serve encoder`

# Build

`npx nx build renderer`
`npx nx build encoder`


# Tests

`npx nx run-many --target=test --all`
