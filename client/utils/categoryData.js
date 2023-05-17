import {
  FaMotorcycle,
  FaBook,
  FaHeadphones,
  FaDumpsterFire,
  FaMugHot,
  FaMobileAlt,
  FaUtensils,
} from 'react-icons/fa'
import {
  MdPedalBike,
  MdOutlineLaptop,
  MdOutlineDevicesOther,
  MdSportsCricket,
  MdControlCamera,
} from 'react-icons/md'

import {
  GiFullMotorcycleHelmet,
  GiClothes,
  GiComputerFan,
  GiPillow,
} from 'react-icons/gi'

export const category = [
  { key: 1, category: 'Books', icon: <FaBook className="text-3xl  " /> },
  {
    key: 2,
    category: 'Bikes and Cars',
    icon: <FaMotorcycle className="text-3xl  " />,
  },
  {
    key: 3,
    category: 'Bike or Car accessories',
    icon: <GiFullMotorcycleHelmet className="text-3xl  " />,
  },
  {
    key: 4,
    category: 'Clothes or Footwear',
    icon: <GiClothes className="text-3xl  " />,
  },
  {
    key: 5,
    category: 'Cooler',
    icon: <GiComputerFan className="text-3xl" />,
  },
  { key: 6, category: 'Cycles', icon: <MdPedalBike className="text-3xl" /> },
  {
    key: 7,
    category: 'Headphones',
    icon: <FaHeadphones className="text-3xl" />,
  },
  { key: 8, category: 'Heater', icon: <FaDumpsterFire className="text-3xl" /> },
  {
    key: 9,
    category: 'Induction or kettle',
    icon: <FaMugHot className="text-3xl" />,
  },
  {
    key: 10,
    category: 'Laptop',
    icon: <MdOutlineLaptop className="text-3xl" />,
  },
  {
    key: 11,
    category: 'Mattress or Pillow or Blanket',
    icon: <GiPillow className="text-3xl" />,
  },
  { key: 12, category: 'Mobiles', icon: <FaMobileAlt className="text-3xl" /> },
  {
    key: 13,
    category: 'Mobile or Laptop accessories',
    icon: <MdOutlineDevicesOther className="text-3xl" />,
  },
  {
    key: 14,
    category: 'Sports equipment',
    icon: <MdSportsCricket className="text-3xl" />,
  },
  { key: 15, category: 'Utensils', icon: <FaUtensils className="text-3xl" /> },
  {
    key: 16,
    category: 'Others',
    icon: <MdControlCamera className="text-3xl" />,
  },
]
