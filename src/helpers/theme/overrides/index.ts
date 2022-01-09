import { merge } from "lodash";
import Card from "./Card";
import { Components, Theme } from "@mui/material";
import Button from "./Button";
import IconButton from "./IconButton";

const componentOverrides = (theme: Theme): Components => {
  return merge(Card(theme), Button(theme), IconButton(theme));
};

export default componentOverrides;
