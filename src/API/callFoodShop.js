import axios from "axios";

export const callFoodShop = async (district) => {
    try {
        const response = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://www.twtainan.net/data/shops_zh-tw.json"
            );
            const filteredData = response.data.filter(
                (item) => item.district === district
                );

                if (filteredData.length > 0) {
                    console.log(filteredData);
                    return filteredData;
                } else {
                    console.log("尚無搜尋到任何美食");
                    return null;
                }
            } catch (error) {
                console.error("Error:", error);
                console.log("搜尋失敗");
                console.log("請重新解鎖CORS https://cors-anywhere.herokuapp.com/corsdemo");
                return null;
            }
        };
