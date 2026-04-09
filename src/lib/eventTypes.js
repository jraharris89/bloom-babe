import { PlantGameIcon, PaletteIcon, ScissorsIcon, TerrariumIcon, FlowerIcon } from '../components/Icons'

export const EVENT_TYPES = {
  'plant-games': {
    label: 'Plant Games for Plant Prizes',
    icon: PlantGameIcon,
    color: 'sage',
    placeholder: '/images/placeholder-plant-games.jpg',
  },
  'paint-night': {
    label: 'Paint Night',
    icon: PaletteIcon,
    color: 'rose',
    placeholder: '/images/placeholder-paint-night.jpg',
  },
  'crafting': {
    label: 'Crafting',
    icon: ScissorsIcon,
    color: 'gold',
    placeholder: '/images/placeholder-crafting.jpg',
  },
  'terrarium': {
    label: 'Terrarium Build',
    icon: TerrariumIcon,
    color: 'sage',
    placeholder: '/images/placeholder-terrarium.jpg',
  },
  'floral': {
    label: 'Building Floral Arrangements',
    icon: FlowerIcon,
    color: 'rose',
    placeholder: '/images/placeholder-floral.jpg',
  },
}

export function getEventType(typeKey) {
  return EVENT_TYPES[typeKey] || EVENT_TYPES['crafting']
}
