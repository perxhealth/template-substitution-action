import fs from "fs"
import assert from "assert"

import { emojify } from "node-emoji"

import * as core from "@actions/core"
import envsub from "envsub"

async function run(): Promise<void> {
  try {
    // Retrieve all required inputs
    const fromPath = core.getInput("from", { required: true })
    const toPath = core.getInput("to", { required: true })

    // Perform some basic validation on `from`
    assert(
      fs.existsSync(fromPath),
      `Path specified in 'from' does not exist: ${fromPath}`
    )

    // If `to` has been supplied, also ensure it doesn't already exist
    assert(
      !fs.existsSync(toPath),
      `Path specified in 'to' already exists: ${toPath}`
    )

    // First, we need to create the output file. `envsub` does not create it
    await core.group("Preparing...", async () => {
      fs.closeSync(fs.openSync(toPath, "w"))
    })

    // Delegate work to `envsub`
    await core.group("Substituting...", async () => {
      return envsub({ templateFile: fromPath, outputFile: toPath }).then(
        async (result: EnvsubResult) => {
          // Log results for transparency and visual feedback
          console.log(emojify(`:bookmark_tabs: From: ${result.templateFile}`))
          console.log(emojify(`:writing_hand: To: ${result.outputFile}`))

          // Assign outputs
          await core.setOutput("location", result.outputFile)
        }
      )
    })
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
