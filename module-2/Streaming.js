{/*{ Buffer and Streaming

streaming-------------------- 
streaming akta process jar maddhome kono data k ak jayga thake onno jaygay pathano hoy. akhane data k choto choto piece piece kore akta package akare pathano hoy

buffer----------------------
streaming ar piece ar jei package ta hoy data pathanor jonno ai package ta k buffer bole

}*/

    const fs = require('fs');

    const readStreaming = fs.createReadStream('./streaming1.txt', { encoding: 'utf-8' })
    const writeStreaming = fs.createWriteStream('./streaming2.txt', { encoding: 'utf-8' })

    readStreaming.on('data', (data) => {
        console.log(data)

        writeStreaming.write(data, (err) => {
            if(err){
                throw Error('error', err)
            }
        })
    })

readStreaming.on('end', ()=>{
    console.log('reading sesh!')
})

writeStreaming.on('finish', ()=>{
    console.log('writing sesh!')
})



}