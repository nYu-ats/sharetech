import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AccountIcon } from "./AccountIcon";

export default {
  title: "Components/Assets/Icon/Common/AccountIcon",
  component: AccountIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof AccountIcon>;

const Template: ComponentStory<typeof AccountIcon> = (args) => (
  <AccountIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
