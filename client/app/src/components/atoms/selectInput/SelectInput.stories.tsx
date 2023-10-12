import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SelectInput";

export default {
  title: "Components/Atoms/SelectInput",
  component: Component,
  args: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
