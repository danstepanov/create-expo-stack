export function showHelp(info, highlight, warning) {
  info('')
  highlight('  Info')
  info('    Creates a new configurable Expo project')
  info('')
  highlight('  Usage')
  warning('    $ npx create-expo-stack <project_name> [options]')
  info('')
  highlight('  Options')
  info(
    '    -d, --default         Use the default options for creating a project',
  )
  info('        --noInstall       Skip installing npm packages or CocoaPods')
  info('        --noGit           Skip initializing a git repository')
  info('        --blank           Use the blank typescript template')
  info('        --npm             Use npm as the package manager')
  info('        --yarn            Use yarn as the package manager')
  info('        --pnpm            Use pnpm as the package manager')
  info('    -i, --ignite          Use Ignite to create an opinionated stack')
  info('    -v, --version         Version number')
  info('    -h, --help            Usage info')
  info('')
  highlight('  Non-Interactive Usage')
  info(
    '    If you know the options you want to use, you can pass them in via the',
  )
  info(
    '    command line. This will skip the interactive CLI and use the options',
  )
  info('    you pass in. This is also useful for CI/CD environments.')
  info('')
  info('    For example:')
  info(' ')
  warning(
    '    $ npx create-expo-stack myProject --nonInteractive --react-navigation --stack --nativewind --noInstall',
  )
  info('')
}
