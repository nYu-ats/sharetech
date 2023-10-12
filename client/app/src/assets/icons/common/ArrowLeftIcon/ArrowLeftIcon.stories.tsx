import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArrowLeftIcon } from "./ArrowLeftIcon";

export default {
  title: "Components/Assets/Icon/Common/ClipBoardIcon",
  component: ArrowLeftIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof ArrowLeftIcon>;

const Template: ComponentStory<typeof ArrowLeftIcon> = (args) => (
  <ArrowLeftIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
