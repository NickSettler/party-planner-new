import { merge } from "lodash";
import Card from "./Card";
import { Components, Theme } from "@mui/material";
import Button from "./Button";

const componentOverrides = (theme: Theme): Components => {
  return merge(Card(theme), Button(theme));
};

export default componentOverrides;
