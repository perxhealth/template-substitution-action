![Perx Health](https://user-images.githubusercontent.com/4101096/163123610-9dfa9263-1518-4f5d-8839-9ddc142a513e.png)

# Template Substitution Action

This repository contains a **GitHub Action** allowing you to hydrate `*.tpl`
files from the environment. It's essentially `envsubst`, GitHub Action'ified.

## Usage

Add the following `step` to a GitHub Actions workflow.

```yaml
- name: Generate Database Config
  uses: perxhealth/template-substitution-action@v1
  with:
    from: ci/templates/database-config.json.tpl
    to: app/repo/database-config.json
```

### Inputs

The Action currently expects two required inputs, and no further optional
inputs.

1. `from`

   Path to a file on local disk expected to be in `*.tpl` format, from which
   we'll generate the hydrated file.

2. `to`

   Path to desired output location on local disk where the hydrated file will
   be placed. Includes file name.

### Outputs

The Action currently supports a single output.

1. `location`

   Essentially provides the `to` input as an output, useful in cases where
   `to` may have been dynamically generated.

## Development

Follow the below steps to get up and running with a local, development copy
of the Action.

### Prerequisites

You will need the following tools installed on your machine.

- [Git](https://git-scm.com/)
- [asdf](https://github.com/asdf-vm/asdf)

### Clone the repository

```bash
$ git clone git@github.com:perxhealth/template-substitution-action
$ cd template-substitution-action
```

### Install dependencies

Firstly, you'll want to ensure the correct versions of the necessary system
dependencies are installed.

```bash
$ asdf install
```

_Note_: optionally, you may need to install the necessary [asdf](https://github.com/asdf-vm/asdf) plugins first.

```bash
$ asdf plugin add nodejs
$ asdf plugin add pnpm
```

Lastly, go ahead and install the Action's dependencies via `pnpm`

```bash
$ pnpm install
```

### Development

There's no server to run, or any particular commands to be aware of during
active development. The best way to make sure your changes behave as intended
is to write unit tests.

The repositories maintainers will take care of packaging and releasing new
versions after Pull Requests have been merged. Although, we plan to automate
this in future if there's enough demand.

### Testing

Ensure you write tests to cover any code or behaviour you introduce. The test
suite can be run with the following command...

```bash
$ pnpm test
```
