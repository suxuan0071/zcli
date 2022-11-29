
const program = require('commander');
const { createProjectActions,addCpnAction,addPageAndRouteAction,addStoreAction } = require('./actions')

const createCommands = () => {
    program
        .command('create <project> [others...]')
        .description('clone repository into a folder')
        .action(createProjectActions)
    program
        .command('addcpn <name>')
        .description('add Vuecomponent in project')
        .action((name)=>{
            addCpnAction(name,program.dest ||'src/components')
        })
    program
        .command('addpage <name>')
        .description('add a vue page in project')
        .action((name)=>{
            addPageAndRouteAction(name,program.dest || `src/pages/${name.toLowerCase()}`)
        })
    program
        .command('addstore <name>')
        .description('add a vue store')
        .action((name)=>{
            addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
        })
}
module.exports = createCommands