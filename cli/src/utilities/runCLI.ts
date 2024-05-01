import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { confirm, isCancel, cancel, multiselect, select } from '@clack/prompts';

import { defaultOptions } from '../constants';
import {
  AuthenticationSelect,
  StateManagementSelect,
  CliResults,
  NavigationSelect,
  NavigationTypes,
  PackageManager,
  SelectedComponents,
  StylingSelect
} from '../types';
import { getDefaultPackageManagerVersion } from './getPackageManager';

const recommendedBunVersion = '1.0.14';

export async function runCLI(toolbox: Toolbox, projectName: string): Promise<CliResults> {
  const {
    parameters: { options },
    print: { info, success, warning }
  } = toolbox;

  // Set the default options
  const cliResults = defaultOptions;

  // Project name already validated, just set cliResults
  cliResults.projectName = projectName;
  cliResults.flags.overwrite = !!options.overwrite;

  // Clear default packages
  cliResults.packages = [];
  // Ask about TypeScript
  const shouldUseTypescript = await confirm({
    message: 'Would you like to use TypeScript with this project?',
    initialValue: true
  });

  if (isCancel(shouldUseTypescript)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (shouldUseTypescript) {
    success('Good call, now using TypeScript! 🚀');
  } else {
    success(`Wrong answer, we're gonna use Typescript.`);
  }

  const defaultPackageManagerVersion = getDefaultPackageManagerVersion();
  if (cliResults.flags.packageManager) {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      const shouldUseDefaultPackageManager = await confirm({
        message: `\nWe've detected ${cliResults.flags.packageManager} ${
          defaultPackageManagerVersion ? `v${defaultPackageManagerVersion}` : ''
        } as your preferred package manager.\nWould you like to continue using it?`,
        initialValue: true
      });

      if (isCancel(shouldUseDefaultPackageManager)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }
      if (!shouldUseDefaultPackageManager) {
        const packageManagerSelect = await select({
          message: 'Gotcha! Which package manager would you like to use?',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'bun', label: 'bun' }
          ]
        });

        if (isCancel(packageManagerSelect)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }

        cliResults.flags.packageManager = packageManagerSelect as PackageManager;
      }
    }
  } else {
    if (options.bun || options.pnpm || options.npm || options.yarn) {
      cliResults.flags.packageManager = options.bun ? 'bun' : options.pnpm ? 'pnpm' : options.npm ? 'npm' : 'yarn';
    } else {
      const packageManagerSelect = await select({
        message: 'Which package manager would you like to use?',
        options: [
          { value: 'npm', label: 'npm' },
          { value: 'yarn', label: 'yarn' },
          { value: 'pnpm', label: 'pnpm' },
          { value: 'bun', label: 'bun' }
        ]
      });

      if (isCancel(packageManagerSelect)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }

      cliResults.flags.packageManager = packageManagerSelect as PackageManager;
    }
  }

  const shouldUseNativeWindUI = await confirm({
    message: 'Would you like to use NativeWindUI?',
    initialValue: true
  });

  if (isCancel(shouldUseNativeWindUI)) {
    cancel('Cancelled... 👋');
    return process.exit(0);
  }

  if (shouldUseNativeWindUI) {
    let selectedComponents: SelectedComponents[] = [];
    selectedComponents = (await multiselect({
      message: 'Which components would you like to explore?',
      options: [
        { value: 'action-sheet', label: 'Action Sheet' },
        { value: 'activity-indicator', label: 'Activity Indicator' },
        { value: 'activity-view', label: 'Activity View' },
        { value: 'alert', label: 'Alert' },
        { value: 'avatar', label: 'Avatar' },
        { value: 'bottom-sheet', label: 'Bottom Sheet' },
        { value: 'context-menu', label: 'Context Menu' },
        { value: 'date-picker', label: 'Date Picker' },
        { value: 'dropdown-menu', label: 'Dropdown Menu' },
        { value: 'picker', label: 'Picker' },
        { value: 'progress-indicator', label: 'Progress Indicator' },
        { value: 'ratings-indicator', label: 'Ratings Indicator' },
        { value: 'segmented-control', label: 'Segmented Control' },
        { value: 'selectable-text', label: 'Selectable Text' },
        { value: 'slider', label: 'Slider' },
        { value: 'text', label: 'Text' },
        { value: 'toggle', label: 'Toggle' }
      ],
      required: false,
      initialValues: [
        'action-sheet',
        'activity-indicator',
        'activity-view',
        'alert',
        'avatar',
        'bottom-sheet',
        'context-menu',
        'date-picker',
        'dropdown-menu',
        'picker',
        'progress-indicator',
        'ratings-indicator',
        'segmented-control',
        'selectable-text',
        'slider',
        'text',
        'toggle'
      ]
    })) as SelectedComponents[];

    if (isCancel(selectedComponents)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    cliResults.packages.push({
      name: 'nativewindui' as StylingSelect,
      type: 'styling',
      options: {
        selectedComponents: selectedComponents as SelectedComponents[]
      }
    });
    cliResults.packages.push({
      name: 'expo-router' as NavigationSelect,
      type: 'navigation',
      options: {
        type: 'drawer + tabs' as NavigationTypes
      }
    });
    success(`You'll be building with ease using NativeWindUI and Expo Router!`);
  } else {
    const navigationSelect = await select({
      message: 'What would you like to use for Navigation?',
      options: [
        { value: 'react-navigation', label: 'React Navigation' },
        { value: 'expo-router', label: 'Expo Router' },
        { value: undefined, label: 'None' }
      ],
      initialValue: 'expo-router'
    });

    if (isCancel(navigationSelect)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    if (navigationSelect) {
      const navigationType = await select({
        message: 'What type of navigation would you like to use?',
        options: [
          { value: 'stack', label: 'Stack' },
          { value: 'tabs', label: 'Tabs' },
          { value: 'drawer + tabs', label: 'Drawer + Tabs' }
        ]
      });

      if (isCancel(navigationType)) {
        cancel('Cancelled... 👋');
        return process.exit(0);
      }

      cliResults.packages.push({
        name: navigationSelect as NavigationSelect,
        type: 'navigation',
        options: {
          type: navigationType as NavigationTypes
        }
      });

      // If the user is using a version of bun that is anything but version 1.0.14, communicate a message
      if (
        cliResults.flags.packageManager === 'bun' &&
        defaultPackageManagerVersion &&
        defaultPackageManagerVersion !== recommendedBunVersion
      ) {
        warning('⚠️' + ' ' + ` We've detected you're using Bun v${defaultPackageManagerVersion}.`);
        info('');
        warning(
          `Some packages may not work correctly if you continue. We recommend using Bun v${recommendedBunVersion} until peerDependencies are properly resolved with bun install.`
        );
        warning(`For more information, visit https://github.com/oven-sh/bun/issues/4946`);
        info('');
        warning(`To switch to Bun v${recommendedBunVersion}, run:`);
        info('');
        warning(`\tcurl -fsSL https://bun.sh/install | bash -s "bun-v${recommendedBunVersion}"`);
        info('');
        warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
        info('');

        const shouldContinue = await confirm({
          message: `Would you like to continue without switching to Bun v${recommendedBunVersion}?`,
          initialValue: false
        });

        if (isCancel(shouldContinue)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }
        success(`Great, we'll use ${navigationSelect}!`);
      } else if (cliResults.flags.packageManager === 'bun' && !defaultPackageManagerVersion) {
        warning(
          '⚠️' + ' ' + ` We've detected you're using Bun but we are unable to determine which version you are using.`
        );
        info('');
        warning(
          `We recommend using Bun v${recommendedBunVersion} until peerDependencies are properly resolved with bun install. If you continue with a version that is not v${recommendedBunVersion}, some packages may not work correctly.`
        );
        warning(`For more information, visit https://github.com/oven-sh/bun/issues/4946`);
        info('');
        warning(`To check your version of Bun, run:`);
        info('');
        warning(`\tbun -version`);
        info('');
        warning(`To switch to Bun v${recommendedBunVersion}, run:`);
        info('');
        warning(`\tcurl -fsSL https://bun.sh/install | bash -s "bun-v${recommendedBunVersion}"`);
        info('');
        warning(`or visit bun.sh/docs/installation for other installation methods (e.g. via Homebrew, npm, etc).`);
        info('');

        const shouldContinue = await confirm({
          message: `Would you like to continue with your current version of Bun?`,
          initialValue: false
        });

        if (isCancel(shouldContinue)) {
          cancel('Cancelled... 👋');
          return process.exit(0);
        }
        success(`Great, we'll use ${navigationSelect}!`);
      }
    } else {
      success(`No problem, skipping navigation for now.`);
    }

    const stylingSelect = await select({
      message: 'What would you like to use for styling?',
      options: [
        { value: 'nativewind', label: 'NativeWind' },
        { value: 'restyle', label: 'Restyle' },
        { value: 'stylesheet', label: 'StyleSheet' },
        { value: 'tamagui', label: 'Tamagui (experimental)' },
        { value: 'unistyles', label: 'Unistyles' }
      ],
      initialValue: 'nativewindui'
    });

    if (isCancel(stylingSelect)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    cliResults.packages.push({ name: stylingSelect as StylingSelect, type: 'styling' });
    success(
      `You'll be styling with ease using ${
        stylingSelect.toString().charAt(0).toUpperCase() + stylingSelect.toString().slice(1)
      }!`
    );

    const authenticationSelect = await select({
      message: 'What would you like to use for authentication?',
      options: [
        { value: undefined, label: 'None' },
        { value: 'supabase', label: 'Supabase' },
        { value: 'firebase', label: 'Firebase' }
      ]
    });

    if (isCancel(authenticationSelect)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }
    if (authenticationSelect) {
      cliResults.packages.push({ name: authenticationSelect as AuthenticationSelect, type: 'authentication' });
    } else {
      success(`No problem, skipping authentication for now.`);
    }

    const stateManagementSelect = await select({
      message: 'What would you like to use for state management?',
      options: [
        { value: undefined, label: 'None' },
        { value: 'zustand', label: 'Zustand' }
        // { value: 'mobx', label: 'MobX' },
      ]
    });

    if (isCancel(stateManagementSelect)) {
      cancel('Cancelled... 👋');
      return process.exit(0);
    }

    if (stateManagementSelect) {
      cliResults.packages.push({ name: stateManagementSelect as StateManagementSelect, type: 'state_management' });
      success(`You'll be using ${stateManagementSelect} for state management.`);
    } else {
      success(`No problem, skipping state management for now.`);
    }

    const internationalizationSelect = await confirm({
      message: `What would you like to support internationalization?`,
      initialValue: false
    });

    if (internationalizationSelect) {
      cliResults.packages.push({ name: 'i18next', type: 'internationalization' });
      success(`You'll be using i18next for internationalization.`);
    } else {
      success(`No problem, skipping internationalization for now.`);
    }
  }

  return cliResults;
}
