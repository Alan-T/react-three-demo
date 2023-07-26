function ViewBtn(props) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          pointerEvents:'all',
          bottom: "20px",
          right: "20px",
          zIndex: 200,
        }}
      >
        <button onClick={() => props.onCameraChanged("left")}>左视</button>
        <button onClick={() => props.onCameraChanged("top")}>俯视</button>
        <button onClick={() => props.onCameraChanged("reset")}>重置</button>
        <button onClick={() => props.onCameraChanged("front")}>正视</button>
        <button onClick={() => props.onCameraChanged("right")}>右视</button>
      </div>
    </>
  );
}

export default ViewBtn;
