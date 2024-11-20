// Parameters
export const gamma: number = 0.5; // damping coefficient
export const t0: number = 2.5; // peak time
export const omega: number = 2 * Math.PI; // angular frequency

// Real part of f(t)
export function realPart(t: number): number {
  return Math.exp(-gamma * Math.pow(t - t0, 2)) * Math.cos(omega * t);
}

// Imaginary part of f(t)
export function imaginaryPart(t: number): number {
  return Math.exp(-gamma * Math.pow(t - t0, 2)) * Math.sin(omega * t);
}
