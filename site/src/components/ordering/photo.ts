import { mediaEntries } from "@/content";
import { images } from "@/content/images";
import type { MenuItem } from "@/content/types";

/**
 * Category-level stock images stand in until real dish photography is
 * supplied. Every fallback is shown with a visible placeholder badge in
 * the item dialog, so stock is never presented as the actual dish.
 */
const categoryPhotos: Record<string, string> = {
  teller: "kebab-plate",
  pizza: "pizza-margherita",
  pide: "pide",
  lahmacun: "dough-hands",
  snacks: "kebab-plate",
  box: "kebab-plate",
};

export function resolveItemPhoto(item: MenuItem, categoryId: string) {
  if (item.image && images[item.image]) {
    const entry = mediaEntries.find((image) => image.id === item.image);
    return {
      photoId: item.image,
      photoIsPlaceholder: entry?.isPlaceholder !== false,
    };
  }

  return {
    photoId: categoryPhotos[categoryId] ?? "kebab-plate",
    photoIsPlaceholder: true,
  };
}
