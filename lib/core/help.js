const program = require('commander')
const helpOptions = () => {
    program.option('-t --test', 'a test')
    program.option('-d --dest<dest>', 'a destination folder,Exc:-d /zcli/src/pages')

    program.on('--help', function () {
        console.log("");
        console.log("if you have other questions,please contact me");
    })
}

module.exports = helpOptions