/**
 * 执行terminal命令的工具 
 */
const {spawn} = require('child_process')

const commandSpawn = (...args)=>{
    return new Promise((reslove,reject)=>{
        const childProcess =  spawn(...args)
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.on('close',()=>{
            reslove();
        })
    })
   
}

module.exports = {
    commandSpawn
}