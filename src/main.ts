import program from 'commander';
import shelljs from 'shelljs';
import { spawn } from 'child_process';
import path from 'path';
import { version } from '../package.json';
import CONFIG from './config';

type ProjectType = 'node';

const basePath = path.join(__dirname, '..');

program
  .version(version, '-v,--version')
  .usage('init <project_name> [options]')
  .option('-t, --type [node]', 'Create a project of the given type.', 'node');

program
  .command('init <project_name>')
  .description(
    'Create a directory with the given name and initialize an empty project.',
  )
  .action(async (name) => {
    await createProject(name, program.type);
  });

program.on('command:*', () => {
  program.help();
  process.exit(1);
});

program.parse(process.argv);

if (!program.args || program.args.length < 1) {
  program.help();
  process.exit(1);
}

function binPath(name: string) {
  return path.join(__dirname, '../node_modules/.bin', name);
}

function installPackages(packages: string[], isDev: boolean) {
  return new Promise((resolve) => {
    if (packages.length === 0) {
      resolve();
    }

    const args = isDev ? ['add', '--dev', ...packages] : ['add', ...packages];
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.log(`yarn exited with code ${code}`);
        process.exit();
      } else {
        resolve();
      }
    });
  });
}

async function createProject(name: string, type: ProjectType) {
  if (!CONFIG.hasOwnProperty(type)) {
    console.log(`Type "${type}" not yet supported.`);
    return;
  }

  const config = CONFIG[type];
  const { starter, configFiles, mkdir, seedFiles } = config;
  const starterPath = `${basePath}/starter/${starter}`;

  console.log(`Creating directory "${name}" ...`);
  shelljs.mkdir(name);
  shelljs.cd(name);

  console.log('Writing package.json ...');
  const pkgJSON = shelljs.cat(`${starterPath}/default-package.json`);
  const pkg = {
    ...JSON.parse(pkgJSON),
    name,
    description: name,
  };
  shelljs.ShellString(JSON.stringify(pkg, null, 2)).to('./package.json');

  console.log('Copying config files ...');
  for (const srcFile of Object.keys(configFiles)) {
    const dstFile = configFiles[srcFile];
    shelljs.cp('-R', `${starterPath}/${srcFile}`, `./${dstFile}`);
  }

  console.log('Creating directories ...');
  if (mkdir && mkdir.length) {
    shelljs.mkdir(...mkdir);
  }
  for (const fileName of Object.keys(seedFiles)) {
    const content = seedFiles[fileName];
    shelljs.ShellString(content).to(`./${fileName}`);
  }

  console.log('Installing packages ...');
  await installPackages(config.packages, false);

  console.log('Installing dev packages ...');
  await installPackages(config.devPackages, true);
}
