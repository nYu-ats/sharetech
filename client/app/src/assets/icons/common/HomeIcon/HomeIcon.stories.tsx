import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HomeIcon } from "./HomeIcon";

export default {
  title: "Components/Assets/Icon/Common/HomeIcon",
  component: HomeIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof HomeIcon>;

const Template: ComponentStory<typeof HomeIcon> = (args) => <HomeIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
