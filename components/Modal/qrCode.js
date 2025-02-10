import React from "react";
import Image from "next/image";

const qrCode = ({ image }) => {
    return <Image src={image} width={300} height={300} alt="qr code" />;
};

export default qrCode;
