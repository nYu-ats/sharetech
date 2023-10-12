import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./ArrayTextInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Molecules/FormItem/ArrayTextInput",
  component: Component,
  args: {
    fields: ["sample", "sample", "sample", "sample", "sample"],
    placeHolder: "sample",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
