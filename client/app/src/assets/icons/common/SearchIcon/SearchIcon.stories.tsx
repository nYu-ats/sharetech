import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchIcon } from "./SearchIcon";

export default {
  title: "Components/Assets/Icon/Common/SearchIcon",
  component: SearchIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof SearchIcon>;

const Template: ComponentStory<typeof SearchIcon> = (args) => <SearchIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
