import * as sh from "shelljs";
import { writeFileSync, copyFileSync, readFileSync } from "fs";

export class BashHelper {
  /**
   * Executes a bash command, and returns executed command.
   * @param cmd Command to be executed
   * @param description Description of the task to be executed
   */
  private static async execCmd(cmd: string[], description: string = "") {
    console.log(`=> Action: ${description}...`);
    const runCmd = sh.exec(cmd.join(" "));

    if (!runCmd.stderr) {
      console.log(`=> Completed: ${description}!`);
      return cmd.join(" ");
    } else {
      console.log(`=> Error: ${description}`);
      throw new Error(description);
    }
  }

  /**
   * Creates a directory
   * @param directory Path of the directory to be created
   * @param createNested If selected, all nested dirs will be created
   */
  public static async createDirectory(
    directory: string,
    createNested: boolean = false
  ) {
    const cmd = ["mkdir", ...(createNested ? ["-p"] : []), directory];
    const action = `Create directory: ${directory}`;
    await BashHelper.execCmd(cmd, action);
  }

  /**
   * Creates an empty file
   * @param directory Directory where the file will be placed
   * @param fileName Name of the file with the extension
   */
  public static async createFile(directory: string, fileName: string) {
    const fileDir = `${directory}/${fileName}`;
    const touchCmd = ["touch", fileDir];
    const touchAction = `Create file: ${fileDir}`;
    await BashHelper.execCmd(touchCmd, touchAction);
  }

  /**
   * Writes a string to a file
   * @param filePath Path of the file
   * @param content Content to be written
   * @param append Append or overwrite
   */
  public static async writeToFile(filePath: string, content: string, append: boolean = false) {
    if (append) {
      content = readFileSync(filePath) + content;
    }
    writeFileSync(filePath, content);
  }

  public static async copyFile(sourceDir: string, targetDir: string) {
    copyFileSync(sourceDir, targetDir);
  }

  /**
   * Creates a new Django project
   * @param projectDir Directory where the Django project will be placed
   * @param projectName Name of the Django project
   */
  public static async createDjangoProject(
    projectDir: string,
    projectName: string
  ) {
    const cmd = ["django-admin", "startproject", projectName, projectDir];
    const action = `Create Django project: ${projectDir} ${projectName}`;
    await BashHelper.execCmd(cmd, action);
  }

  /**
   * Creates a new Django app
   * @param projectDir Project directory where the Django app will be created
   * @param appName Name of the Django app
   */
  public static async createDjangoApp(projectDir: string, appName: string) {
    const cmd = ["django-admin", "startapp", appName, projectDir];
    const action = `Create Django app: ${projectDir} ${appName}`;
    await BashHelper.execCmd(cmd, action);
  }

  /**
   * Formats Python project with PEP8 standards
   * @param projectDir Path of the proejct to be formatted
   */
  public static async formatProjectWithAutopep8(projectDir: string) {
    const cmd = ["autopep8", "--in-place", "--recursive", projectDir];
    const action = `Format project files: ${projectDir}`;
    await BashHelper.execCmd(cmd, action);
  }

  /**
   * Compress a directory into a ZIP file
   * @param directory Directory to be compressed
   */
  public static async compressDirectory(directory: string) {
    const cmd = ["zip", "-r", `${directory}.zip`, directory];
    const action = `Compress directory: ${directory}`;
    await BashHelper.execCmd(cmd, action);
  }
}
