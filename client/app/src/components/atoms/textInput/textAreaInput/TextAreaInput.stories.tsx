import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./TextAreaInput";

export default {
  title: "Components/Atoms/TextInput/TextAreaInput",
  component: Component,
  args: {
    placeHolder: "Sample Text Input",
    maxLength: 500,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
