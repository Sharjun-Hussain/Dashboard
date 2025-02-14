import { Factory, HardDrive, LayoutGrid, School } from "lucide-react";

export const NavItems = [
  {
    Name: "PVC (Polyvinyl Chloride)",
    Path: "/dashboard/assets/category/pvc",
    Icon: <LayoutGrid width={17} className="text-pink-600  dark:text-white" />,
    description:
      "PVC Pipes and Fittings: Durable and lightweight materials for plumbing and industrial fluid handling systems.",
  },
  {
    Name: "DG (Durable assets)",
    Path: "/dashboard/assets/category/dg",
    Icon: <HardDrive width={17} className="text-pink-600  dark:text-white" />,
    description:
      "Construction Blocks: Includes bricks and cement blocks for robust construction needs.",
  },
  {
    Name: "MB (Miscellaneous Building Materials)",
    Path: "/dashboard/assets/category/mb",
    Icon: <School width={17} className="text-pink-600  dark:text-white" />,
    description:
      "Building Chemicals and Coatings: Lubricants, paints, and polishes for maintaining construction elements.",
  },
  {
    Name: "MS (Mild Steel)",
    Path: "/dashboard/assets/category/ms",
    Icon: <Factory width={17} className="text-pink-600  dark:text-white" />,
    description:
      "Mild Steel Products: Angals (angles) and rods for structural applications in construction.",
  },
  {
    Name: "MC (Metal Components)",
    Path: "/dashboard/assets/category/mc",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
    description:
      "Metal Fasteners and Fittings: Brass and iron tower bolts for secure installations.",
  },
  {
    Name: "GI (Galvanized Iron)",
    Path: "/dashboard/assets/category/gi",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
    description:
      "Galvanized Iron Sheets: Plain sheets, specialized sheets, and chicken mesh for construction and agricultural use.",
  },
  {
    Name: "TIM (Timber)",
    Path: "/dashboard/assets/category/tim",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
    description:
      "Timber and Wooden Products: Beading, reapers, and timber pieces for aesthetic and structural wooden frameworks.",
  },
  {
    Name: "MIS (Miscellaneous)",
    Path: "/dashboard/assets/category/mis",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
    description:
      "Miscellaneous Hardware: Razor wires, anchor bolts, and base plates for specialized applications.",
  },
];
