import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkIcon } from "./LinkIcon";

export default {
  title: "Components/Assets/Icon/Common/LinkIcon",
  component: LinkIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof LinkIcon>;

const Template: ComponentStory<typeof LinkIcon> = (args) => <LinkIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
