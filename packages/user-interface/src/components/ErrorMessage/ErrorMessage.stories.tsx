import { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
 title: "Example/ErrorMessage",
 component: ErrorMessage,
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default = {
 args: {
  error: "An error occurred",
 },
};
