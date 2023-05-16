import type { Meta, StoryObj } from "@storybook/react";

import { NoPostsPage } from "./NoPostsPage";

const meta: Meta<typeof NoPostsPage> = {
 title: "Example/ErrorPages/NoPostsPage",
 component: NoPostsPage,
};

export default meta;
type Story = StoryObj<typeof NoPostsPage>;

export const Default: Story = {
 args: {},
};
