import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClipBoardIcon } from "./ClipBoardIcon";

export default {
  title: "Components/Assets/Icon/Common/ClipBoardIcon",
  component: ClipBoardIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof ClipBoardIcon>;

const Template: ComponentStory<typeof ClipBoardIcon> = (args) => (
  <ClipBoardIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
