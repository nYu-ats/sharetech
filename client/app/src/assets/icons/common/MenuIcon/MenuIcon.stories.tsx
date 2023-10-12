import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MenuIcon } from "./MenuIcon";

export default {
  title: "Components/Assets/Icon/Common/LinkIcon",
  component: MenuIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof MenuIcon>;

const Template: ComponentStory<typeof MenuIcon> = (args) => <MenuIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
