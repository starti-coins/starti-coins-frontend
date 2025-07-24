import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode("197t34guefobjaldSADd");

export const generateToken = async (
  data: Map<string, unknown>,
  expirationTime: string
) => {
  const jwt = await new SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secret);

  return jwt;
};

export const verifyToken = async (token: string) => {
  const { payload, protectedHeader } = await jwtVerify(token, secret);
  return { payload, protectedHeader };
};
