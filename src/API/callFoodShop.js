import axios from "axios";

export const callFoodShop = async (district) => {
    try {
        const response = await axios.get(
            "https://www.twtainan.net/data/shops_zh-tw.json"
        );
        console.log(response)
        const filteredData = response.data.filter((item) => {
            if (district?.includes(item.district)) {
                return item
            }
        });

        if (filteredData.length > 0) {
            return filteredData;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        console.log("搜尋失敗");
        console.log("請重新解鎖CORS https://cors-anywhere.herokuapp.com/corsdemo");
        return [];
    }
};
