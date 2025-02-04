import React from "react";

function OtpInputField({ length = 6,otp, setOtp, className }) {
  // States
  const [cursor, setCursor] = React.useState(0);
  const refs = React.useRef([]);
  // Methods

  const handlePaste = (e)=>{
    e.preventDefault();
    const data = e.clipboardData.getData("text");
    if (data=="") return null;
    setOtp(data.split('').slice(0,6));
    setCursor(data.length>6?5:data.length-1);
  }

  const handleChange = (e, index) => {
    setOtp((oldOtp) => {
      if (e.target.value === "") {
        const newOtp = [...oldOtp];
        newOtp[index] = "";
        return newOtp;
      }
      else{
        const newOtp = [...oldOtp];
        newOtp[index] = e.target.value;
        if (index < length) {
            setCursor(index + 1);
        }
        return newOtp;
    }
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      setOtp((oldOtp) => {
        const newOtp = [...oldOtp];
        newOtp[index] = "";
        if (index > 0) setCursor(index - 1);

        return newOtp;
      });
    }
  };

  React.useEffect(() => {
    if (otp.length === length) {
    }

    if (cursor < length && cursor >= 0) {
      refs.current[cursor].focus();
    }
  }, [cursor]);

  return (
    <div className={`flex gap-2 justify-center items-center ${className}`} onPaste={handlePaste}>
      {Array.from({ length: length }).map((_, i) => {
        return (
          <input
            key={i}
            type="text"
            maxLength={1}
            className={`w-10 h-10 text-center text-3xl border border-gray-300 caret-transparent `}//${otp[i]?"border-green-700":""}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e, i)}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={otp[i]}
          />
        );
      })}
    </div>
  );
}

export default OtpInputField;
