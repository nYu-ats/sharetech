import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./TextInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Molecules/FormItem/TextInput",
  component: Component,
  args: {
    label: "text input",
    onChange: action("change"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
