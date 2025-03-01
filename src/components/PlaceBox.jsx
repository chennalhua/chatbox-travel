import TextLongToDot from "assets/function/TextLongToDot";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "antd";
import { typeData } from "assets/function/settingData";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../redux/action/chatAction";
const PlaceBox = ({ item, width, themeType }) => {
  const dispatch = useDispatch()
  const allChatData = useSelector(state => state.chatRe)
  const router = useNavigate();

  const handleUI = {
    img: (item) => {
      if (!!item?.PictureUrl1) {
        return <img
          alt={item?.PictureDescription1}
          src={item?.PictureUrl1}
          height={183}
        />
      } else {
        if (themeType === '美食' || themeType === 'food') {
          return <img
            src={require("assets/image/FOOD.png")}
            alt={`${item?.name}-沒有相關圖片 QQ`}
          />
        } else if (themeType === '景點' || themeType === 'attractions') {
          return <img
            src={require("assets/image/ATTRACTIONS.png")}
            alt={`${item?.name}-沒有相關圖片 QQ`}
          />
        } else if (themeType === '住宿' || themeType === 'hotel') {
          return <img
            src={require("assets/image/HOTEL.png")}
            alt={`${item?.name}-沒有相關圖片 QQ`}
          />
        }
      }
    }
  }

  return (
    <>
      <Card
        style={{ width: 350 }}
        cover={
          handleUI.img(item?.picture)
        }
        actions={[
          allChatData?.tagData.includes(item) ?
            <HeartFilled style={{ fontSize: '20px', color: '#d82323ff' }} onClick={(_) => dispatch(removeTag(item.name))} />
            :
            <HeartOutlined style={{ fontSize: '20px' }} onClick={(_) => dispatch(addTag(item))} />,
          <Button color="default" variant="solid" onClick={e =>
            router({
              pathname: `/detail`,
              search: `type=${item.type}&city=${item.city}&name=${item?.name}`,
            })}>查看更多</Button>
        ]}

      >
        <Badge className="mb-2" color={typeData(themeType).color} count={!!item?.class ? item?.class : typeData(themeType).cn} />
        <p className="fw-bolder" style={{ fontSize: '18px' }}>{item?.name}</p>
        {!!item?.des &&
          <p className="text-gray">{TextLongToDot(item?.des)}</p>
        }
      </Card>
    </>
  );
};
export default PlaceBox;
