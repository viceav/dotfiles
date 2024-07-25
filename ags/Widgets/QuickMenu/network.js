import { Base_Box, Box } from "./utils.js";
const net = await Service.import("network");

export const Network_Box = Box();
Network_Box.children = [Base_Box];
