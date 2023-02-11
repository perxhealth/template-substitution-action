import * as core from "@actions/core"

async function run(): Promise<void> {
  try {
    // Do the things
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}
