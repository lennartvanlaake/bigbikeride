import { imageSizes, getResizeFileName, Image } from "../../../types/types";

const maxSize = imageSizes.reduce((a, b) => Math.max(a, b));

export function getLink(elementSize: number, image: Image) {
	if (elementSize >= maxSize) {
		return image.path;
	}
	const closestSize = imageSizes.filter((number) => number >= elementSize).reduce(
		(a, b) => Math.min(a, b)
	)
	return getResizeFileName(image.id, closestSize); 
}
