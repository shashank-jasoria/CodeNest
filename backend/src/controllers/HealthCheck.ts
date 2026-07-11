import express from "express";

export const healthChecks = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("success");
};
