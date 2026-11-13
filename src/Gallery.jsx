import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const base = import.meta.env.BASE_URL
const image = (file) => `${base}media/${file}`

const artworks = [
  { name: 'Abandon Witch Room', kind: '3D environment / ArtStation', file: 'witch-room-final.webp', description: 'A personal abandoned-room environment. The published project shows the scene from wireframe and solid passes through render and final adjustment.', link: 'https://www.artstation.com/artwork/yJG409' },
  { name: 'Madness Corridor', kind: 'Horror environment / ArtStation', file: 'madness-corridor.webp', description: 'An atmospheric horror corridor made in Blender, published as a personal artwork on ArtStation.', link: 'https://www.artstation.com/artwork/2qVVEa' },
  { name: 'Witch Room / Wireframe', kind: 'Process / geometry', file: 'witch-room-wireframe.webp', description: 'The wireframe pass for Abandon Witch Room, showing the structure beneath the finished environment.', link: 'https://www.artstation.com/artwork/yJG409' },
  { name: 'Witch Room / Solid', kind: 'Process / form', file: 'witch-room-solid.webp', description: 'The solid pass for Abandon Witch Room before the scene received final materials and lighting.', link: 'https://www.artstation.com/artwork/yJG409' },
  { name: 'Witch Room / Render', kind: 'Process / lighting', file: 'witch-room-render.webp', description: 'The render pass for Abandon Witch Room before the final adjustments.', link: 'https://www.artstation.com/artwork/yJG409' },
  { name: 'Talion', kind: 'Character / atmospheric study', file: 'talion.webp', description: 'A character render exploring silhouette and dramatic sunset lighting.' },
  { name: 'Komala', kind: 'Character / playful world', file: 'komala.webp', description: 'A stylized character study built around soft forms and a light, playful setting.' },
  { name: 'Tidy Room', kind: 'Environment / interior', file: 'tidy-room.webp', description: 'An interior study focused on scene construction, objects and light.' },
  { name: 'Bathroom', kind: 'Environment / material study', file: 'bathroom.webp', description: 'An interior render exploring material surfaces and spatial composition.' },
  { name: 'House', kind: 'Environment / architecture', file: 'house.webp', description: 'A small architectural environment exploring shape, scale and atmosphere.' },
  { name: 'Brokoli', kind: 'Object / stylized study', file: 'brokoli.webp', description: 'A stylized object study with playful forms and saturated color.' },
]

export default function Gallery({ SectionHead }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [lightbox, setLightbox] = useState(false)
  const [visible, setVisible] = useState(false)
  const section = useRef(null)
  const dialog = useRef(null)
  const reduce = useReducedMotion()
  const cycle = (amount) => setActive(index => (index + amount + artworks.length) % artworks.length)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .12 })
    if (section.current) observer.observe(section.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!playing || !visible || lightbox || reduce) return
    const timer = window.setInterval(() => cycle(1), 5200)
    return () => window.clearInterval(timer)
  }, [playing, visible, lightbox, reduce])
  useEffect(() => {
    if (lightbox && !dialog.current?.open) dialog.current?.showModal()
    if (!lightbox && dialog.current?.open) dialog.current.close()
  }, [lightbox])

  const current = artworks[active]
  const choose = (index) => { setActive(index); setPlaying(false) }
  const keyboard = event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); cycle(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); cycle(-1) }
  }

  return <section id="worlds" className="gallery-section section-pad" ref={section}>
    <div className="wrap"><SectionHead index="03" label="THE OTHER SIDE" title={<>Things that <em>don't exist.</em></>} note="Until someone makes them. Explore published ArtStation pieces and original 3D studies." /></div>
    <div className="gallery-shell wrap">
      <div className="gallery-main">
        <button type="button" className="gallery-image-button" onClick={() => { setPlaying(false); setLightbox(true) }} aria-label={`Expand ${current.name}`}>
          <AnimatePresence mode="wait"><motion.img key={current.file} src={image(current.file)} alt={`${current.name}, ${current.kind}, 3D work by Rihhadatul Aimi`} initial={reduce ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: .3 }} /></AnimatePresence>
          <span className="expand-label">VIEW FULL IMAGE ↗</span>
        </button>
        <div className="gallery-bar"><div><span className="eyebrow">{String(active + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}</span><h3>{current.name}</h3><p>{current.kind}</p></div><div className="gallery-controls"><button type="button" onClick={() => choose((active - 1 + artworks.length) % artworks.length)} aria-label="Previous artwork">←</button><button type="button" onClick={() => choose((active + 1) % artworks.length)} aria-label="Next artwork">→</button></div></div>
        <div className="gallery-description"><p>{current.description}</p>{current.link && <a href={current.link} target="_blank" rel="noopener noreferrer">VIEW PROJECT ON ARTSTATION ↗</a>}</div>
        <button className="autoplay-control" type="button" aria-pressed={playing && !reduce} onClick={() => setPlaying(!playing)} disabled={reduce}>{reduce ? 'AUTO-ADVANCE OFF (REDUCED MOTION)' : playing ? 'PAUSE SLIDESHOW Ⅱ' : 'PLAY SLIDESHOW ▶'}</button>
      </div>
      <div className="gallery-rail" aria-label="Select artwork">{artworks.map((art, index) => <button type="button" className={index === active ? 'selected' : ''} onClick={() => choose(index)} key={art.file} aria-label={`Show ${art.name}`} aria-pressed={index === active}><img src={image(art.file)} alt="" loading="lazy" /><span>{art.name}</span></button>)}</div>
    </div>
    <div className="gallery-bottom wrap"><span>SELECTED 3D WORK / 2018—2025</span><div><a href="https://www.artstation.com/artwork/yJG409" target="_blank" rel="noopener noreferrer">ABANDON WITCH ROOM ↗</a><a href="https://www.artstation.com/artwork/2qVVEa" target="_blank" rel="noopener noreferrer">MADNESS CORRIDOR ↗</a></div></div>
    <dialog ref={dialog} className="lightbox" onClose={() => setLightbox(false)} onKeyDown={keyboard} onClick={event => { if (event.target === dialog.current) setLightbox(false) }} aria-label="Expanded artwork">
      <button type="button" className="lightbox-close" onClick={() => setLightbox(false)}>CLOSE ×</button>
      <img src={image(current.file)} alt={`${current.name}, ${current.kind}`} />
      <div className="lightbox-foot"><span>{current.name} — {active + 1}/{artworks.length}</span><div><button type="button" onClick={() => cycle(-1)} aria-label="Previous artwork">←</button><button type="button" onClick={() => cycle(1)} aria-label="Next artwork">→</button></div></div>
    </dialog>
  </section>
}
