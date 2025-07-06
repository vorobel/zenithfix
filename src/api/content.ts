import { ApiResponse } from "@/types/content";
import { MOCKED_CONTENT_DATA } from "@/mocks/api/content";

export const fetchContent = async (
    page: number,
    category: keyof ApiResponse["categories"] = "trending"
): Promise<ApiResponse> => {
    return new Promise<ApiResponse>((resolve, reject) => {
        setTimeout(() => {
            if (page === 3) {
                reject(new Error("Simulated API failure"));
            } else {
                console.log(`Fetched ${category} page ${page} data (mocked)`);
                resolve(MOCKED_CONTENT_DATA);
            }
        }, 1000);
    });
};
