import sharp from 'sharp'
import fs from 'fs'
const dir='public/scenes'
const groups={}
for (const f of fs.readdirSync(dir).filter(f=>f.startsWith('_cn-'))) {
  const slug=f.replace(/-\d+\.jpg$/,'').replace('_cn-','')
  ;(groups[slug]=groups[slug]||[]).push(f)
}
for (const [slug,files] of Object.entries(groups)){
  files.sort()
  const tiles=[]
  for (let i=0;i<files.length;i++){
    const t=await sharp(`${dir}/${files[i]}`).resize(300,200,{fit:'cover'}).toBuffer()
    tiles.push({input:t, left:i*300, top:0})
  }
  const w=files.length*300
  await sharp({create:{width:w,height:200,channels:3,background:'#222'}}).composite(tiles).jpeg({quality:78}).toFile(`/tmp/m-${slug}.jpg`)
  console.log('montage',slug,files.map((f,i)=>`#${i}:${f.match(/-(\d)\.jpg/)[1]}`).join(' '))
}
