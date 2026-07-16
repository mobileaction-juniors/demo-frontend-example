import { filterArr } from "@/cleanupResources";

export function filterDescription(cleanedDescription) {
    return cleanedDescription.split(" ").filter((word) => !filterArr.includes(word)).join(" ");
}