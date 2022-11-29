const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const compile = (template, data) => {
    const templatePosition = `../templates/${template}`;
    const templatePath = path.resolve(__dirname, templatePosition)
    return new Promise((reslove, reject) => {
        ejs.renderFile(templatePath, { data }, {}, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            reslove(res)
        })
    })
}
const writeTofile = (path, content) => {
    return fs.promises.writeFile(path, content);
}
const makedir = (dirname) => {
    if(fs.existsSync(dirname)){
        return true
    }else{
        if(makedir(path.dirname(dirname))){
            fs.mkdirSync(dirname)
            return true
        }
    }
}
const func = function(a){
    if(a === 1){
        return 1
    }
    res = res * func(a--)
    return res
}
module.exports = {
    compile, writeTofile,makedir
}