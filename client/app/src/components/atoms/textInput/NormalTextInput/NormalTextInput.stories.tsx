import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./NormalTextInput";

export default {
  title: "Components/Atoms/TextInput/NormalTextInput",
  component: Component,
  args: {
    placeHolder: "Sample Text Input",
    maxLength: 10,
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
