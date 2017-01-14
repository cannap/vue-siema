
import Siema from './main'
import SiemaSlide from './siema-slide'

if (typeof window !== 'undefined') {
  window.Siema = Siema
  window.SiemanSlide = SiemaSlide
}

export {
  Siema,
  SiemaSlide
}
