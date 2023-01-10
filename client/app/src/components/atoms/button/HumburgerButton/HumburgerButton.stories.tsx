import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./HumburgerButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Atoms/Button/HumbergerButton",
  component: Component,
  args: {
    type: "button",
    onClick: action("clicked"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
