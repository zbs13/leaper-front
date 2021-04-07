export const randId = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);

export const ellipsisText = (text, max) => ((text).length > max) ? (((text).substring(0, max - 3)) + '...') : text