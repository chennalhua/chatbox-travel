import { HeartOutlined, HomeOutlined, MessageOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TodoForm from "components/todo/TodoForm";
import { useLocation } from "react-router-dom";
const Nav = () => {
  const location = useLocation()
  let navList = [
    {
      path: "",
      name: "首頁",
      component: <Button size="large" color="default" variant="text" icon={<HomeOutlined style={{ fontSize: '22px' }} />} onClick={(_) => window.location.href = '/'}></Button>
    },
    {
      path: "chat",
      name: "聊天",
      component: <Button size="large" color="default" variant="text" icon={<MessageOutlined style={{ fontSize: '22px' }} />} onClick={(_) => window.location.href = '/chat'}></Button>
    },
    {
      path: "todoAdd",
      name: "紀錄新增",
      component: <TodoForm />
    },
    {
      path: "myTag",
      name: "收藏",
      component: <Button size="large" color="default" variant="text" icon={<HeartOutlined style={{ fontSize: '22px' }} />} onClick={(_) => window.location.href = '/myTag'}></Button>
    },
    {
      path: "todo",
      name: "紀錄",
      component: <Button size="large" color="default" variant="text" icon={<UnorderedListOutlined style={{ fontSize: '22px' }} />} onClick={(_) => window.location.href = '/todo'}></Button>
    }
  ];
  return (
    <>
      <div className="nav">
        <div className="container my-auto">
          <div className="d-flex justify-content-around align-items-end">
            {navList.map((item) => {
              return <div className={`${`/${item.path}` === location.pathname && item.path !== 'todoAdd' && 'active'}`}>{item.component}</div>
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
