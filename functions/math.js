export function random(min, max) {return Math.random() * (max - min) + min;}
export function randomHex()      {return '#'+Math.floor(random(0, 16777215)).toString(16);}
export function angle(vec)       {return Math.atan2(vec[1], vec[0]);}
export function rad(angle)       {return angle * Math.PI / 180;}
export function abs(a)           {return Math.abs(a)}