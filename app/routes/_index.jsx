import ColorPicker from "../Components/ColorPicker/ColorPicker";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div  style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8",border:"1px solid blue", width:"400px",margin:"0 auto"}}>
      <ColorPicker/>
    </div>
  );
}
