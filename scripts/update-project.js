/**
 * This script is used to change the name of the project in .env and package.json
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Validates npm package name according to npm rules
// See: https://github.com/npm/validate-npm-package-name
function isValidPackageName(name) {
  const validNamePattern =
    /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/;
  return !validNamePattern.test(name);
}

// Validate slug
function isValidSlug(slug) {
  const validSlugPattern = /^[a-z0-9-]+$/;
  return !validSlugPattern.test(slug);
}

// Validate scheme
function isValidScheme(scheme) {
  const validSchemePattern = /^[a-z0-9-]+$/;
  return !validSchemePattern.test(scheme);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForSlug(projectName) {
  rl.question(
    "What would you like the app slug to be? (Press enter to use project name) ",
    (slug) => {
      const appSlug = slug || projectName;

      if (isValidSlug(appSlug)) {
        console.error(
          "❌ Invalid app slug. Slug can only contain lowercase letters, numbers, and hyphens."
        );
        rl.close();
        return;
      }

      askForScheme(projectName, appSlug);
    }
  );
}

function askForScheme(projectName, appSlug) {
  rl.question(
    "What would you like the app scheme to be? (Press enter to use project name) ",
    (scheme) => {
      const appScheme = scheme || projectName;

      if (isValidScheme(appScheme)) {
        console.error(
          "❌ Invalid app scheme. Scheme can only contain lowercase letters, numbers, and hyphens."
        );
        rl.close();
        return;
      }

      // Update .env with all values
      const envPath = path.join(__dirname, "..", ".env");
      let envContent = fs.readFileSync(envPath, "utf8");
      envContent = envContent.replace(
        /^APP_NAME=.*$/m,
        `APP_NAME=${projectName}`
      );
      envContent = envContent.replace(/^APP_SLUG=.*$/m, `APP_SLUG=${appSlug}`);
      envContent = envContent.replace(
        /^APP_SCHEME=.*$/m,
        `APP_SCHEME=${appScheme}`
      );
      fs.writeFileSync(envPath, envContent);

      // Update package.json
      const packageJsonPath = path.join(__dirname, "..", "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageJson.name = projectName;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log(
        `✅ Updated project name to "${projectName}", app slug to "${appSlug}", and scheme to "${appScheme}"`
      );
      rl.close();
    }
  );
}

rl.question("What would you like to name your project? ", (projectName) => {
  if (isValidPackageName(projectName)) {
    console.error(
      "❌ Invalid package name. Package names must follow npm naming rules.\n\nSee: https://github.com/npm/validate-npm-package-name"
    );
    rl.close();
    return;
  }

  askForSlug(projectName);
});
