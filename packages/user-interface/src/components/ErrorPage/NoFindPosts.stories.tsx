import type { Meta, StoryObj } from "@storybook/react";

import { NoFindPosts } from "./NoFindPosts";

const meta: Meta<typeof NoFindPosts> = {
 title: "Example/ErrorPages/NoFindPosts",
 component: NoFindPosts,
};

export default meta;
type Story = StoryObj<typeof NoFindPosts>;

export const Default: Story = {
 args: {},
};
