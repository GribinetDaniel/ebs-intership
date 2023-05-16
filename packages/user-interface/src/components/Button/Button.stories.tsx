import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
 title: "Example/Button",
 component: Button,
 tags: ["autodocs"],
 argTypes: {
  style: {
   backgroundColor: {
    control: "color",
   },
  },
 },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
 args: {
  type: "primary",
  children: "Button",
  style: { width: "200px" },
 },
};

export const Secondary: Story = {
 args: {
  children: "Button",
  type: "secondary",
  style: { width: "200px" },
 },
};

export const Disabled: Story = {
 args: {
  children: "Button",
  type: "primary",
  style: { width: "200px" },
  disabled: true,
 },
};
