import { useSelector } from "react-redux";
const MesBox = ({ type, data }) => {
  //@ REDUX
  const userData = useSelector(state => state.userRe.userData);
  const handleStyle = {
    imgMask: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  };

  return (
    <>
      <div className="mt-2 mb-4">
        <div className="text-end">
          <img
            src={
              !!userData
                ? userData?.picture
                : require("assets/image/user.jpg")
            }
            className="img-fluid"
            style={handleStyle?.imgMask}
            alt=""
          />
        </div>
        <div className="mt-2 text-end">
          <div className="bg-light p-3 rounded d-inline-block light-box">{data}</div>
        </div>
      </div>
    </>
  );
};
export default MesBox;
