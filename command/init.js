const inquirer = require("inquirer");
const { exec } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const ejs = require("ejs");
const { GIT_URL, INJECT_FILES } = require("../config/index");

module.exports = (projectName) => {
  let prompts = [
    {
      type: "confirm",
      message: "auto install packages",
      name: "auto_install",
      default: true,
    },
  ];

  inquirer.prompt(prompts).then((answer) => {
    console.log(chalk.green("开始初始化文件\n"));
    console.log(chalk.gray("初始化中..."));

    exec(`git clone ${GIT_URL} ${projectName}`, (error, stdout, stderr) => {
      console.log(chalk.green("模板下载完毕"));
      if (error) {
        // 当有错误时打印出错误并退出操作
        console.log("error: ", error);
        console.log(chalk.red("拷贝文件失败"));
        process.exit();
      }
      const data = {
        projectName: projectName,
      };
      new Promise((resolve) => {
        INJECT_FILES.forEach((val, index) => {
          console.log("val", val);
          ejs.renderFile(`${projectName}/${val}`, data, (err, str) => {
            fs.writeFile(`${projectName}/${val}`, str, () => {
              if (index === INJECT_FILES.length - 1) {
                resolve();
              }
            });
          });
        });
      }).then(() => {
        if (answer.auto_install) {
          exec(`cd ${projectName} && npm i`, (err, stdout, stderr) => {
            console.log(chalk.green("依赖包下载完毕"));
            if (error) {
              // 当有错误时打印出错误并退出操作
              console.log(chalk.red("拷贝文件失败"));
              process.exit();
            }
            console.log(chalk.green("初始化完成"));
            process.exit(); // 退出这次命令行操作
          });
        } else {
          console.log(chalk.green("初始化完成"));
        }
      });
    });
  });
};
