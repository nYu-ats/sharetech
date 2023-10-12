import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArrowRightIcon } from "./ArrowRightIcon";

export default {
  title: "Components/Assets/Icon/Common/ClipBoardIcon",
  component: ArrowRightIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof ArrowRightIcon>;

const Template: ComponentStory<typeof ArrowRightIcon> = (args) => (
  <ArrowRightIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
