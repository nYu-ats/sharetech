import { ComponentStory, ComponentMeta } from "@storybook/react";
import { GearIcon } from "./GearIcon";

export default {
  title: "Components/Assets/Icon/Common/GearIcon",
  component: GearIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof GearIcon>;

const Template: ComponentStory<typeof GearIcon> = (args) => <GearIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
