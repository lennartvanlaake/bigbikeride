import { imageSizes, getResizeFileName, Image } from "../../../types/types";
import axios from "axios";

const maxSize = imageSizes.reduce((a, b) => Math.max(a, b));
const base = import.meta.env.VITE_THUMBNAIL_BASE_URL;

export async function getLink(elementSize: number, image: Image) {
	if (elementSize >= maxSize) {
		return image.path;
	}
	const closestSize = imageSizes
		.filter((number) => number >= elementSize)
		.reduce((a, b) => Math.min(a, b));
	let resizedFile = getResizeFileName(image.id, closestSize, base);
	let fileResponse: any;
	if (import.meta.env.DEV) {
		fileResponse = await axios.get(resizedFile, {
			validateStatus: () => true,
		});
	} else {
		fileResponse = await axios.head(resizedFile, {
			validateStatus: () => true,
		});
	}
	if (fileResponse.status != 200) {
		return image.path;
	}
	return resizedFile;
}
