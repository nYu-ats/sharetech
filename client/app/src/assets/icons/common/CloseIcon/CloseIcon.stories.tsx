import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CloseIcon } from "./CloseIcon";

export default {
  title: "Components/Assets/Icon/Common/CloseIcon",
  component: CloseIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => <CloseIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
