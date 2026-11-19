import type { StaticImageData } from "next/image";
import baklava from "@/media/baklava.jpg";
import doughHands from "@/media/dough-hands.jpg";
import heroGrill from "@/media/hero-grill.jpg";
import kebabPlate from "@/media/kebab-plate.jpg";
import pide from "@/media/pide.jpg";
import pizzaMargherita from "@/media/pizza-margherita.jpg";
import pomegranate from "@/media/pomegranate.jpg";

export const images: Record<string, StaticImageData> = {
  "hero-grill": heroGrill,
  "dough-hands": doughHands,
  "kebab-plate": kebabPlate,
  "pizza-margherita": pizzaMargherita,
  "baklava": baklava,
  pide,
  pomegranate,
};
