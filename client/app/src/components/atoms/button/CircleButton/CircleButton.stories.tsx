import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./CircleButton";
import { action } from "@storybook/addon-actions";
import { getIcon } from "assets/icons/Icon.function";

export default {
  title: "Components/Atoms/Button/CircleButton",
  component: Component,
  args: {
    children: getIcon("HOME", { color: "WHITE", size: "NORMAL" }),
    type: "button",
    onClick: action("clicked"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  size: "LARGE",
  children: getIcon("HOME", { color: "WHITE", size: "LARGE" }),
};

export const Small = Template.bind({});
Small.args = {
  size: "SMALL",
  outline: true,
  children: getIcon("HOME", { size: "SMALL" }),
};

export const Outlined = Template.bind({});
Outlined.args = { outline: true, children: getIcon("HOME", { size: "NORMAL" }) };
