import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TrashIcon } from "./TrashIcon";

export default {
  title: "Components/Assets/Icon/Common/TrashIcon",
  component: TrashIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof TrashIcon>;

const Template: ComponentStory<typeof TrashIcon> = (args) => <TrashIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
