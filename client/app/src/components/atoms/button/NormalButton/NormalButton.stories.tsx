import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Atoms/Button/NormalButton",
  component: Component,
  args: {
    children: <p>Sample</p>,
    type: "button",
    onClick: action("clicked"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = { size: "LARGE" };

export const Small = Template.bind({});
Small.args = { size: "SMALL" };

export const Outlined = Template.bind({});
Outlined.args = { outline: true };
