import { renderShareImage } from "@/features/seo";

export const alt = "Garam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderShareImage(size);
}
