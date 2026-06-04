import sharp from 'sharp'
import fs from 'fs'
const src='public/scenes/china'
const out='public/scenes'
const files=fs.readdirSync(src).filter(f=>/\.(png|jpg|jpeg)$/i.test(f))
for(const f of files){
  const slug=f.replace(/\.(png|jpe?g)$/i,'')
  const img=sharp(`${src}/${f}`)
  const m=await img.metadata()
  const keepH=Math.round(m.height*0.85)        // 去掉底部 15%（含右下水印）
  const buf=await sharp(`${src}/${f}`)
    .extract({left:0,top:0,width:m.width,height:keepH})
    .resize(1600,1000,{fit:'cover',position:'attention'})
    .modulate({saturation:1.06,brightness:1.02})
    .jpeg({quality:84,mozjpeg:true})
    .toBuffer()
  fs.writeFileSync(`${out}/${slug}.jpg`, buf)
  console.log('done',slug, (buf.length/1024|0)+'KB')
}
