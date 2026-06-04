import sharp from 'sharp'
import fs from 'fs'
const dir = 'public/scenes'
const files = fs.readdirSync(dir).filter(f=>f.endsWith('.jpg'))
for (const f of files) {
  const src = `${dir}/${f}`
  const buf = fs.readFileSync(src)
  const out = await sharp(buf)
    .resize(1600, 1000, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 1.06, brightness: 1.02 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  fs.writeFileSync(src, out)
  console.log('processed', f, out.length)
}
