import crypto from "crypto";

const generateRefreshToken = (): string => {
  const buf = crypto.randomBytes(32);

  return buf.toString("hex");
};

const hashRefreshToken = (token: string): string => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

export { generateRefreshToken, hashRefreshToken };