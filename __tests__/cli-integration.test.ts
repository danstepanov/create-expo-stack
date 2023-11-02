import { system, filesystem } from 'gluegun'

import { version } from '../package.json'

const src = filesystem.path(__dirname, `..`)

const cli = async (cmd) =>
  system.run(
    `node ` + filesystem.path(src, `bin`, `create-expo-stack`) + ` ${cmd}`
  )

jest.setTimeout(100000); // Set a 100-second timeout

// Run tests for each package manager
const packageManagers = [`npm`, `yarn`, `pnpm`, `bun`]

test(`outputs version`, async () => {
  const output = await cli(`--version`)
  expect(output).toContain(version)
})

test(`outputs help`, async () => {
  const output = await cli(`--help`)
  expect(output).toContain(`Info`)
})

for (const packageManager of packageManagers) {
  // --default
  test(`generates a default project with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --default --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation stack
  test(`generates a project with react-navigation stack with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation stack nativewind
  test(`generates a project with react-navigation stack and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --nativewind --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and nativewind and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --nativewind --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and nativewind and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --nativewind --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation stack tamagui
  test(`generates a project with react-navigation stack and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --tamagui --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and tamagui and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --tamagui --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation stack and tamagui and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --stack --tamagui --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation tabs
  test(`generates a project with react-navigation tabs with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation tabs nativewind
  test(`generates a project with react-navigation tabs and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --nativewind --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and nativewind and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --nativewind --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and nativewind and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --nativewind --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --react-navigation tabs tamagui
  test(`generates a project with react-navigation tabs and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --tamagui --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and tamagui and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --tamagui --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with react-navigation tabs and tamagui and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --react-navigation --tabs --tamagui --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router stack
  test(`generates a project with expo-router stack with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router stack nativewind
  test(`generates a project with expo-router stack and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --nativewind --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and nativewind and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --nativewind --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and nativewind and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --nativewind --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router stack tamagui
  test(`generates a project with expo-router stack and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and tamagui and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router stack and tamagui and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --stack --tamagui --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router tabs
  test(`generates a project with expo-router tabs with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router tabs nativewind
  test(`generates a project with expo-router tabs and nativewind with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --nativewind --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and nativewind and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --nativewind --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and nativewind and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --nativewind --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  // --expo-router tabs tamagui
  test(`generates a project with expo-router tabs and tamagui with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and tamagui and noGit with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --noGit --${packageManager}`)
    expect(output).toContain(packageManager)
  })

  test(`generates a project with expo-router tabs and tamagui and noGit and noInstall with ${packageManager}`, async () => {
    const output = await cli(`myTestProject --expo-router --tabs --tamagui --noGit --noInstall --${packageManager}`)
    expect(output).toContain(packageManager)
  })
}