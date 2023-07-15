const SendingTime = ({ side }: { side: "left" | "right" }) => (
    <p className={`text-${side} text-xs opacity-50 mb-5 mx-3.5`}>over 1 seconds ago</p>
);

export default SendingTime;
