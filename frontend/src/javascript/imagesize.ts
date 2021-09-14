import { imageSizes, getResizeFileName, Image } from "../../../types/types";
import axios from "axios";

const maxSize = imageSizes.reduce((a, b) => Math.max(a, b));

export async function getLink(elementSize: number, image: Image) {
	if (elementSize >= maxSize) {
		return image.path;
	}
	const closestSize = imageSizes
		.filter((number) => number >= elementSize)
		.reduce((a, b) => Math.min(a, b));
	let resizedFile = getResizeFileName(image.id, closestSize);
	let fileResponse = await axios.head(resizedFile, {
		validateStatus: () => true,
	});
	if (fileResponse.status != 200) {
		return image.path;
	}
	return getResizeFileName(image.id, closestSize);
}
