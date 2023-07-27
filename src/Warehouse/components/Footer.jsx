import "./Footer.css";

function ViewBtn(props) {
  return (
    <>
      <div className="footer-container">
        <div className="btn-group">
          <button onClick={() => props.onCameraChanged("left")}>左 视</button>
          <button onClick={() => props.onCameraChanged("top")}>俯 视</button>
          <button onClick={() => props.onCameraChanged("reset")}>重 置</button>
          <button onClick={() => props.onCameraChanged("front")}>正 视</button>
          <button onClick={() => props.onCameraChanged("right")}>右 视</button>
        </div>
      </div>
    </>
  );
}

export default ViewBtn;
