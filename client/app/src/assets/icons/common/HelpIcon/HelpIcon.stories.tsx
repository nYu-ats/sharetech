import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HelpIcon } from "./HelpIcon";

export default {
  title: "Components/Assets/Icon/Common/HelpIcon",
  component: HelpIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof HelpIcon>;

const Template: ComponentStory<typeof HelpIcon> = (args) => <HelpIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
