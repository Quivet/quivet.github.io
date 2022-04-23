/* eslint-disable no-console */
import {execa} from 'execa';
import {existsSync} from "fs";
const branchName = "production";
const mainBranch = "main";
(async () => {
  try {
    await execa("git", ["checkout", "--orphan", branchName]);
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    const folderName = existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", branchName]);
    console.log(`Pushing to ${branchName}...`);
    await execa("git", ["push", "origin", `HEAD:${branchName}`, "--force"]);
    try {
      await execa("rm", ["-r", folderName]);
    } catch (e) {
      await execa("rmdir", [folderName])
    }
    
    await execa("git", ["checkout", "-f", mainBranch]);
    await execa("git", ["branch", "-D", branchName]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();