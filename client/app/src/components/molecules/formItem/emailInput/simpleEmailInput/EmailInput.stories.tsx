import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./EmailInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Molecules/FormItem/EmailInput",
  component: Component,
  args: {
    value: "",
    onChange: action("change"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
