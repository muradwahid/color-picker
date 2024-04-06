import { useEffect, useRef, useState } from "react";

function ColorPicker() {
  const colorPickerRef = useRef();
  const pickerEl = useRef();
  const colorPickerMainRef = useRef();
  const canvasRef = useRef();
  const [currentColor, setCurrentColor] = useState();

  useEffect(() => {
    let isDragging = false;
    let initialX, initialY;

    const handleMouseDown = (e) => {
      e.preventDefault();
      e.type === "mousedown" ? (isDragging = true) : null;
      initialX = e.clientX;
      initialY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;
        colorPickFunc(
          pickerEl.current.offsetLeft + deltaX,
          pickerEl.current.offsetTop + deltaY
        );
        console.log(pickerEl.current.offsetTop + deltaY);
        if (
          pickerEl.current.offsetLeft + deltaX+5  > 0 &&
          pickerEl.current.offsetLeft + deltaX < 205 
        ) {
          pickerEl.current.style.left = `${
            pickerEl.current.offsetLeft + deltaX
          }px`;
        }
        if (
          pickerEl.current.offsetTop + deltaX + 3 >= 0 &&
          pickerEl.current.offsetTop + deltaX < 210
        ) {
          pickerEl.current.style.top = `${
            pickerEl.current.offsetTop + deltaY
          }px`;
        }

        initialX = e.clientX;
        initialY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    //get color
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let selectedColor;
    const colorPickFunc = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = initialX - rect.left;
      const y = initialY - rect.top;

      const imageData = ctx.getImageData(x, y, 1, 1).data;

      // Get the RGB values from the image data
      const red = imageData[0];
      const green = imageData[1];
      const blue = imageData[2];

      // Convert RGB to hex code
      const hex = `#${red.toString(16).padStart(2, "0")}${green
        .toString(16)
        .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

      selectedColor = hex;
      setCurrentColor(selectedColor);
      console.log(selectedColor);
    };

    // Generate a color gradient on the canvas
    // const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    // gradient.addColorStop(0, "red");
    // gradient.addColorStop(1 / 6, "orange");
    // gradient.addColorStop(2 / 6, "yellow");
    // gradient.addColorStop(3 / 6, "green");
    // gradient.addColorStop(4 / 6, "blue");
    // gradient.addColorStop(5 / 6, "indigo");
    // gradient.addColorStop(1, "violet");

    // ctx.fillStyle = gradient;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    //set dynamic color
    let color = "#f00";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    whiteGradient.addColorStop(0, "#fff");
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    pickerEl.current.addEventListener("mousedown", handleMouseDown);
    colorPickerRef.current.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      pickerEl.current.removeEventListener("mousedown", handleMouseDown);
      colorPickerRef.current.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      style={{ position: "relative" }}
      className="shopify-color-picker-wrapper"
      ref={colorPickerMainRef}
    >
      <div
        ref={colorPickerRef}
        className="colorPickerArea"
        style={{
          height: "190px",
          width: "216px",
          position: "relative",
          margin: "10px",
          // overflow:"hidden"
        }}
      >
        {/* <div style={{ width: "230px", height: "180px" }}></div> */}
        <div
          ref={pickerEl}
          style={{
            position: "absolute",
            height: "15px",
            width: "15px",
            border: "1px solid #f0f0f0",
            top: "10px",
            left: "10px",
            borderRadius: "50%",
            background: currentColor,
          }}
        ></div>
        <canvas
          style={{ height: "100%", width: "100%", background: "#ccc" }}
          ref={canvasRef}
          className="spectrumColor"
        ></canvas>
      </div>
    </div>
  );
}

export default ColorPicker;
