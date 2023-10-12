import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextIcon } from "./TextIcon";

export default {
  title: "Components/Assets/Icon/Common/LinkIcon",
  component: TextIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof TextIcon>;

const Template: ComponentStory<typeof TextIcon> = (args) => <TextIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
