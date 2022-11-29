
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-conifg')
const { commandSpawn } = require('../utils/terminal')
const path = require('path')
const { compile,writeTofile,makedir } = require('../utils/utils')
const createProjectActions = async (project) => {
    //clone项目
    await download( vueRepo, project, { clone: true })
    //执行npm install
    const npm = process.platform === 'win32' ? 'npm.cmd':'npm'
    await commandSpawn(npm,['install'],{cwd:`./${project}`})

    //运行npm run serve
    await commandSpawn(npm,['run','serve'],{cwd:`./${project}`})

}
const createTemplate = async (name,dest,template,docName,createDir) =>{
    const data = {name,lowerName:name.toLowerCase()}
    const res =  await compile(template,data)
    if(createDir){
        makedir(dest)
    }
    const dirpath = path.resolve(dest,docName)
    writeTofile(dirpath,res) 
}
//创建组件
const addCpnAction = async (name,dest) => {
    createTemplate(name,dest,"vue-component.ejs",`${name}.vue`,false)
}
//创建页面和路由
const addPageAndRouteAction = async (name,dest) =>{
    createTemplate(name,dest,"vue-component.ejs",`${name}.vue`,true)
    createTemplate(name,dest,"vue-router.ejs",`router.js`,true)

}
//创建状态管理
const addStoreAction = async (name,dest) =>{
    createTemplate(name,dest,"vue-store.ejs",`${name}.js`,true)
    createTemplate(name,dest,"vue-types.ejs",`type.js`,true)

}
module.exports = {
    createProjectActions,
    addCpnAction,
    addPageAndRouteAction,
    addStoreAction
}