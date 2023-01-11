import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PlusIcon } from "./PlusIcon";

export default {
  title: "Components/Assets/Icon/Common/PlusIcon",
  component: PlusIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof PlusIcon>;

const Template: ComponentStory<typeof PlusIcon> = (args) => <PlusIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
