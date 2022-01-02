import { merge } from "lodash";
import Card from "./Card";
import { Components, Theme } from "@mui/material";

const componentOverrides = (theme: Theme): Components => {
  return merge(Card(theme));
};

export default componentOverrides;
